import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import { RunScriptURLRegexCondition } from 'src/classes/pageScript/runScriptConditions'
import SiteGlobalStore, { GlobalStoreState } from '../siteGlobal/siteGlobalStore'
import SubjectListPageManager from '../subjectList'
import InsertTemplateSubjects from './devScripts/insertTemplateSubjects'
import RunDevOnlyScripts from './runDevOnlyScripts'

export type SubjListWrapperData = {
    getDevMode: () => boolean
    setDevMode: (devMode: boolean) => void
}

export default class SubjectListPageManagerWrapper extends PageScriptsManager<SubjListWrapperData, any> {
    protected pageScripts = {
        runDevOnlyScripts: new RunDevOnlyScripts({
            insertTemplateSubjects: new InsertTemplateSubjects()
        })
    }
    private subjectListPageManager = new SubjectListPageManager()
    constructor() {
        super({
            pageStore: undefined as any,
            runScriptConditions: [new RunScriptURLRegexCondition(/\/subject\/list\/list\/list-switcher\/current|\/subject\/list/g)]
        })
    }
    protected onPageScriptsEnabled(): void {
        const globalStore = SiteGlobalStore.getInstance()

        const argData: SubjListWrapperData = {
            getDevMode: () => !!globalStore.state.globalObj.get()?.devMode,
            setDevMode: (devMode: boolean) => globalStore.state.globalObj.set({ ...(globalStore.state.globalObj.get() || {}), devMode })
        }
        this.pageScripts.runDevOnlyScripts.run(argData)
        this.subjectListPageManager.checkRunScriptConditions()
    }
    protected onPageFocus(onFocusEvent: FocusEvent): void {
        this.updatePageScripts(undefined)
    }
}
