import { createElementWithAttr } from 'src/util/misc'

export class ParsedSubjectEl {
    id: number
    url: string
    newsUrl: string
    lessonsPlanUrl: string
    forumUrl: string
    rootEl: HTMLElement
    optionsEl: HTMLElement
    titleEl: HTMLAnchorElement
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
    // TODO: Refactor, create generic createIfNotExists method for html elements
    getAdditionalLinksContainer(): HTMLElement {
        const className = 'additional-subject-links-container'

        const additionalLinksContainer = this.optionsEl.querySelector('.' + className) as HTMLElement
        if (additionalLinksContainer) return additionalLinksContainer

        const el = createElementWithAttr('div', { class: className })

        return this.optionsEl.insertBefore(el, (this.optionsEl.querySelector('#lesson_title') as HTMLElement).nextSibling)
    }
    getSubjectButtonsContainer(): HTMLElement {
        const additionalLinksContainer = this.getAdditionalLinksContainer()
        const className = 'subject-buttons-container'

        const buttonsContainer = additionalLinksContainer.querySelector('.' + className) as HTMLElement
        if (buttonsContainer) return buttonsContainer

        const el = createElementWithAttr('div', { class: className })
        return additionalLinksContainer.appendChild(el)
    }
}
