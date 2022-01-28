import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import InsertBadgeScript from './insertBadgeScript'
import SiteGlobalStore from './store'

export default class SiteGlobalScriptManager extends PageScriptsManager<SiteGlobalStore> {
    pageScripts = {
        insertBadgeScript: new InsertBadgeScript()
    }
    constructor() {
        super(SiteGlobalStore.getInstance(), [])
    }
    onPageLoad(ev: Event): void {
        this.runPageScripts()
    }
    onPageFocus(ev: FocusEvent): void {
        this.updatePageScripts()
    }
}
