import { BrowserStore } from '../classes/browserStore'
import { PageScriptData } from '../classes/pageData'
import insertAdditionalSubjectLinks from './insertAdditionalLinks'
import insertAdditionalSubjectButtons from './insertAdditionalButtons'
import { createElementWithAttr } from '../../util/misc'
import insertSubjectMinimizeButton from './insertSubjectMinimizeButton'
import subjectListStore from './store'

// TODO: Refactor all page/script declaration (including storage, parsers, etc.) into a single class

class ParsedSubjectEl {
    id: number
    url: string
    newsUrl: string
    lessonsPlanUrl: string
    forumUrl: string
    rootEl: HTMLElement
    optionsEl: HTMLElement
    titleEl: HTMLAnchorElement
    additionalLinksContainer?: HTMLElement
    noteContainer?: HTMLElement
    constructor(rootEl: HTMLElement) {
        this.rootEl = rootEl
        this.optionsEl = rootEl.querySelector('td.lesson_options') as HTMLElement

        // lesson_url format - /subject/index/card/list-switcher/current/subject_id/12345
        this.titleEl = rootEl.querySelector('div#lesson_title a') as HTMLAnchorElement
        const id = parseInt(this.titleEl.href.split('/').slice(-1)[0])

        this.id = id
        this.url = `/subject/index/card/subject_id/${id}`
        this.newsUrl = `/news/index/index/subject_id/${id}/subject/subject`
        this.lessonsPlanUrl = `/lesson/list/my/subject_id/${id}`
        this.forumUrl = `/forum/subject/subject/${id}`
    }
}

export class SubjectListPageData extends PageScriptData<typeof subjectListStore> {
    subjects: ParsedSubjectEl[]
    constructor() {
        super(subjectListStore)
        this.subjects = Array.from(document.querySelectorAll('div.lesson')).map((el) => new ParsedSubjectEl(el as HTMLElement))
    }
}

//TODO: Insert link/menu for extension updates & news
//TODO: Reorder subjects w/ drag & drop/arrows/priority numbers
//TODO: ?rework/opt. fetch notifications
//TODO: ?fetch total news count & last update. Optionally add links to individual news pages (or display 'no news')
//TODO: ?Change title for every tab (remove Virtual Educational Environment)
//TODO: Option menu for disabling userway (acessibility widget)
//TODO: Foldable notes for each subject on main ?(& others). ?Remember textarea size.
//      Persistence options:
//      - cloud storage (dropbox, mega, etc.)
//      - store data in a extension ?incognito warning (https://www.reddit.com/r/GreaseMonkey/comments/pb760b/comment/ha9ura3, https://violentmonkey.github.io/api/gm/, https://wiki.greasespot.net/GM.setValue)
export default async function modifySubjectListPage() {
    const pageData = new SubjectListPageData()
    insertAdditionalSubjectLinks(pageData)
    insertAdditionalSubjectButtons(pageData)
    insertSubjectMinimizeButton(pageData)
}

export function getSubjectButtonsContainer(parent: HTMLElement): HTMLElement {
    const buttonsContainerClassName = 'subject-buttons-container'
    let el = parent.querySelector('.' + buttonsContainerClassName)
    if (!el) {
        el = createElementWithAttr('div', { class: buttonsContainerClassName })
        parent.append(el)
    }
    return el as HTMLElement
}
