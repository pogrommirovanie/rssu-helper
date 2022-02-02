import { RunScriptURLRegexCondition } from 'src/classes/pageScript/runScriptConditions'
import { PageScriptsManager } from 'src/classes/pageScript/pageScriptsManager'
import insertSubjectMinimizeButton from './scripts/insertMinSubjectBtn/insertMinimizeSubjectBtns'
import InsertSubjectNoteElsScript from './scripts/insertNoteEls/insertNoteEls'
import InsertAdditionalLinks from './scripts/insertAdditionalLinks'
import { ParsedSubjectEl } from './parsers/parsedSubjectEl'
import SubjectListStore from './subjectListStore'

export class SubjectListPageData {
    private subjects: ParsedSubjectEl[]
    private store: SubjectListStore
    constructor() {
        this.subjects = Array.from(document.querySelectorAll('div.lesson')).map((el) => new ParsedSubjectEl(el as HTMLElement))
        this.store = SubjectListStore.getInstance()
    }
    getSubjects(): ParsedSubjectEl[] {
        return this.subjects
    }
    getStore() {
        return this.store
    }
}
export default class SubjectListPageManager extends PageScriptsManager<SubjectListPageData> {
    protected pageScripts = {
        insertAdditionalLinks: new InsertAdditionalLinks(),
        insertSubjectNoteEls: new InsertSubjectNoteElsScript(),
        insertMinimizeSubjectBtn: new insertSubjectMinimizeButton()
    }
    constructor() {
        super({
            runScriptConditions: [new RunScriptURLRegexCondition(/\/subject\/list\/list\/list-switcher\/current|\/subject\/list(\?|\/?$)/g)]
        })
    }
    protected supplyScriptArgument(): SubjectListPageData {
        return new SubjectListPageData()
    }
}

//TODO: Improve link/menu for extension updates & news
//TODO: Reorder subjects w/ drag & drop/arrows/priority numbers
//TODO: ?rework/opt. fetch notifications
//TODO: ?fetch total news count & last update. Optionally add links to individual news pages (or display 'no news')
//TODO: ?Change title for every tab (remove Virtual Educational Environment)
//TODO: Option menu for disabling userway (acessibility widget)
//TODO: Foldable notes for each subject on main ?(& other pages). ?Individually resize each textarea, remember custom size
//TODO: ?Individual subject lesson notes
//      Persistence options:
//      - cloud storage (dropbox, mega, etc.)
//      - store data in a extension ?incognito warning (https://www.reddit.com/r/GreaseMonkey/comments/pb760b/comment/ha9ura3, https://violentmonkey.github.io/api/gm/, https://wiki.greasespot.net/GM.setValue)
//      - GM local storage, might not save data in incognito for some browsers. More info:
//          https://www.reddit.com/r/GreaseMonkey/comments/pb760b/comment/ha9ura3
//          https://violentmonkey.github.io/api/gm/
//          https://wiki.greasespot.net/GM.setValue

// Alternative solutions for dealing with extension setting store values from multiple tabs:
//          - lsbridge (exchange messages between tabs): https://github.com/krasimir/lsbridge
//          - localforage (async storage with custom driver support): https://github.com/localForage/localForage
