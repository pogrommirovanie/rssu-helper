import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import SiteGlobalScriptManager from 'src/pageManager/siteGlobal'
import SubjectListPageManager from 'src/pageManager/subjectList'
import 'src/styles/index.less'

// TODO: Create boilerplate repostiory for other GM scripts
// TODO: Try to decrease time to responsive by making /techsupport/ajax/get-form & es/events/get?types async
// TODO: Ability to consecutively run pageManagers and nest pageManagers within each other (example use: inserting placeholder subjects for dev when there's no subjects for user)

const pageScriptManagers: { [x: string]: PageScriptsManager<any> } = {
    subjectListPageManager: new SubjectListPageManager(),
    SiteScriptManager: new SiteGlobalScriptManager()
}
