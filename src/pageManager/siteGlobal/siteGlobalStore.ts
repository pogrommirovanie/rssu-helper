import { BrowserStore } from 'src/classes/store/browserStore'

export type GlobalStoreState = {
    /** ms unix timestamp of the last time any store value was set. */
    // lastUpdate?: number
    devMode?: boolean
}

class SiteGlobalStore extends BrowserStore {
    state = {
        globalObj: this.createStoreEntryObject<GlobalStoreState>('globalState', {})
    }
    private constructor() {
        super({ type: 'global', options: {} })
    }
    private static instance?: SiteGlobalStore
    static getInstance() {
        let instance = SiteGlobalStore.instance
        if (!instance) {
            instance = new SiteGlobalStore()
            SiteGlobalStore.instance = instance
        }
        return instance
    }
}

export default SiteGlobalStore
