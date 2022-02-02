import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import SiteGlobalScriptManager from 'src/pageManager/siteGlobal'
import SubjectListPageManagerWrapper from 'src/pageManager/subjectListWrapper'
import 'src/styles/index.less'

// TODO: Create boilerplate repostiory for other GM scripts
// TODO: Try to decrease time to responsive by making /techsupport/ajax/get-form & es/events/get?types async

const pageScriptManagers: { [x: string]: PageScriptsManager<any> } = {
    siteScriptManager: new SiteGlobalScriptManager(),
    subjectListPageManagerWrapper: new SubjectListPageManagerWrapper()
}

window.addEventListener('load', () => {
    Object.values(pageScriptManagers).forEach((scriptManagers) => scriptManagers.tryToEnable())
})
