import SubjectListPageManager from 'src/pageManager/subjectList'
import SiteGlobalStore from 'src/pageManager/siteGlobal/store/siteGlobalStore'
import { DevModeWrapper } from 'src/classes/pageScript/generic/devOnlyScripts'
import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import { RunScriptURLRegexCondition } from 'src/classes/pageScript/runScriptConditions'
import DevOnlyInsertTemplateSubjects from './devScriptInsertTemplateSubjects'

export default class SubjectListPageManagerWrapper extends PageScriptsManager<DevModeWrapper> {
    protected pageScripts = {
        runDevOnlyScripts: new DevOnlyInsertTemplateSubjects()
    }
    private subjectListPageManager = new SubjectListPageManager()
    constructor() {
        super({
            runScriptConditions: [new RunScriptURLRegexCondition(/\/subject\/list\/list\/list-switcher\/current|\/subject\/list(\?|\/?$)/g)]
        })
    }
    protected supplyScriptArgument(): DevModeWrapper {
        const globalStore = SiteGlobalStore.getInstance()

        const argData: DevModeWrapper = {
            getDevMode: () => !!globalStore.state.globalObj.get()?.devMode,
            setDevMode: (devMode: boolean) => globalStore.state.globalObj.set({ ...(globalStore.state.globalObj.get() || {}), devMode })
        }
        return argData
    }
    protected override onPageScriptsEnabled(): void {
        this.runPageScripts()
        this.subjectListPageManager.tryToEnable()
    }
}
