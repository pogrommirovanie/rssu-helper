import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import InsertBadgeScript from './insertBadgeScript'
import SiteGlobalStore from './siteGlobalStore'

export default class SiteGlobalScriptManager extends PageScriptsManager<undefined, SiteGlobalStore> {
    protected pageScripts = {
        insertBadgeScript: new InsertBadgeScript()
    }
    constructor() {
        super({
            pageStore: SiteGlobalStore.getInstance()
        })
    }
    protected onPageScriptsEnabled(): void {
        this.runPageScripts(undefined)
    }
    protected onPageFocus(onFocusEvent: FocusEvent): void {
        this.updatePageScripts()
    }
}
