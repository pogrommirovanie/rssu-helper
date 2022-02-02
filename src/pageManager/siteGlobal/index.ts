import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import InsertBadgeScript from './insertBadgeScript'
import SiteGlobalStore from './store/siteGlobalStore'

export class SiteGlobalScriptData {
    private store: SiteGlobalStore
    getStore(): SiteGlobalStore {
        return this.store
    }
    constructor() {
        this.store = SiteGlobalStore.getInstance()
    }
}

export default class SiteGlobalScriptManager extends PageScriptsManager<SiteGlobalScriptData> {
    protected pageScripts = {
        insertBadgeScript: new InsertBadgeScript()
    }
    constructor() {
        super({
            runScriptConditions: []
        })
    }
    protected supplyScriptArgument(): SiteGlobalScriptData {
        return new SiteGlobalScriptData()
    }
}
