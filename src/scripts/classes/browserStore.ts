import { storeConfig } from '../../config'

// TODO: ?Extend this class, (make JSONValue variables & set, get methods)

class StoreEntry<T extends JSONObject> {
    private key: string
    private storeGet: () => T | undefined
    private storeSet: (data?: T) => void
    constructor(key: string, get: () => T | undefined, set: (data?: T) => void) {
        this.key = key
        this.storeGet = get
        this.storeSet = set
    }
    get(): T | undefined {
        return this.storeGet()
    }
    set(data: T | undefined) {
        this.storeSet(data)
    }
}

type BaseStoreScopeData = { type: 'global' } | { type: 'pageScript'; pageScriptName: string }
// eslint-disable-next-line @typescript-eslint/ban-types
type StoreScopeDataOptions = {}
type StoreScopeData = BaseStoreScopeData & { options?: StoreScopeDataOptions }

// variables for detecting if store is used by another tab. Will be removed, once a better store solution is implemented
let lastLocalStoreUpdate: number
let multiTabLock = false

export class BrowserStore {
    private scopeData: Readonly<StoreScopeData>
    private storeKey: Readonly<string>
    state: { [x: string]: StoreEntry<any> } = {}

    constructor(scopeData: StoreScopeData) {
        this.scopeData = scopeData

        let storeKey: string | undefined = undefined
        if (this.scopeData.type == 'global') storeKey = this.scopeData.type
        else if (this.scopeData.type == 'pageScript') storeKey = this.scopeData.type + '-' + this.scopeData.pageScriptName

        if (!storeKey) {
            console.error({ scopeData: this.scopeData, storeKey })
            throw new Error('Unable to form a store key to use browser extension (GM_* api) storage.')
        }
        this.storeKey = storeConfig.gmDataPrefix + storeKey
    }
    private getStoreEntries<T extends JSONObject>(): Record<string, T> {
        const storeValue = GM_getValue(this.storeKey)
        return storeValue ? JSON.parse(storeValue) : {}
    }
    private getStoreEntry<T extends JSONObject>(key: string): T | undefined {
        return this.getStoreEntries<T>()[key]
    }
    private setStoreEntry<T extends JSONObject>(key: string, data: T | undefined) {
        const map: Record<string, T> = this.getStoreEntries<T>()
        if (data) map[key] = data
        else delete map[key]
        // console.log({ storeKey: this.storeKey, key, data })
        GM_setValue(this.storeKey, JSON.stringify(map))
    }

    //TODO: Find a better solution for dealing with extension setting store values from multiple tabs. Options:
    //          - lsbridge (exchange messages between tabs): https://github.com/krasimir/lsbridge
    //          - localforage (async storage with custom driver support): https://github.com/localForage/localForage
    protected createStoreEntryObject<T extends JSONObject>(key: string, defaultValue?: T): StoreEntry<T> {
        //#region hacky wrapper for setStoreEntry method that prevents the extension from overriding store values from multiple tabs
        const setStoreEntry = (data: T | undefined) => {
            if (this.scopeData.type != 'global' && !multiTabLock) {
                const curGlobalStoreState = globalStore.state.globalObj.get()

                if (lastLocalStoreUpdate && curGlobalStoreState?.lastUpdate != lastLocalStoreUpdate) {
                    multiTabLock = true
                    console.warn(
                        'Detected store update from another tab. This was probably caused by the extension running in multiple tabs.\n' +
                            'Since multitab storage is currently not supported, all store updates on this tab will be ignored until you refresh the page.'
                    )

                    // disables/displays lock message on all subject notes
                    document.querySelectorAll('.subject-note-textarea').forEach((el: Element) => {
                        const tArea = el as HTMLTextAreaElement
                        tArea.disabled = true
                        tArea.value =
                            'Открыто несколько вкладок с предметами.\n' + 'Перезагрузите страницу, чтобы получить возможность редактировать заметки.'

                        // Triggers the 'onchange' event to adjust the height of textarea
                        if ('createEvent' in document) {
                            const evt = document.createEvent('HTMLEvents')
                            evt.initEvent('change', false, true)
                            tArea.dispatchEvent(evt)
                        } else (tArea as any).fireEvent('onchange')
                    })
                }
            }

            if (!multiTabLock) {
                this.setStoreEntry(key, data)

                if (this.scopeData.type != 'global') {
                    const timeMS = new Date().getTime()
                    lastLocalStoreUpdate = timeMS
                    globalStore.state.globalObj.set({ lastUpdate: timeMS })
                }
            }
        }
        //#endregion

        const entry = new StoreEntry<T>(key, () => this.getStoreEntry(key), setStoreEntry)
        if (!entry.get() && defaultValue) setStoreEntry(defaultValue)

        return entry
    }
}

type GlobalStoreState = {
    /** ms unix timestamp of the last time any store value was set. */
    lastUpdate?: number
}

class GlobalBrowserStore extends BrowserStore {
    state = {
        globalObj: this.createStoreEntryObject<GlobalStoreState>('globalState', {})
    }
    constructor() {
        super({ type: 'global', options: {} })
    }
}

const globalStore = new GlobalBrowserStore()
