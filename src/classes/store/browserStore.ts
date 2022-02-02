import { storeConfig } from 'src/config'
import { StoreScopeData, StoreEntry } from './storeEntry'

// TODO: [LOW PRIOR] ?refactor BrowserStore class as a singleton (using https://stackoverflow.com/a/3284757) or just create store classes without it (see siteGlobal store, subjectList store)
export abstract class BrowserStore {
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
        // console.log({ ms: new Date().getTime(), storeKey: this.storeKey, key }, JSON.stringify(data))
        GM_setValue(this.storeKey, JSON.stringify(map))
    }

    // TODO: Differentiate StoreEntry type between optional and always non-null (require defaultValue if set to non-null, account for version changes)
    protected createStoreEntryObject<T extends JSONObject>(key: string, defaultValue?: T): StoreEntry<T> {
        const setStoreEntry = (data: T | undefined) => this.setStoreEntry(key, data)

        const entry = new StoreEntry<T>(key, () => this.getStoreEntry(key), setStoreEntry)
        if (!entry.get() && defaultValue) setStoreEntry(defaultValue)

        return entry
    }
}
