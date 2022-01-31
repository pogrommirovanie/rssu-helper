import { createElementWithAttr } from 'src/util/misc'

export class ParsedSubjectEl {
    private _id: number
    public get id(): number {
        return this._id
    }
    private _url: string
    public get url(): string {
        return this._url
    }
    private _newsUrl: string
    public get newsUrl(): string {
        return this._newsUrl
    }
    private _lessonsPlanUrl: string
    public get lessonsPlanUrl(): string {
        return this._lessonsPlanUrl
    }
    private _forumUrl: string
    public get forumUrl(): string {
        return this._forumUrl
    }
    private _rootEl: HTMLElement
    public get rootEl(): HTMLElement {
        return this._rootEl
    }
    private _optionsEl: HTMLElement
    public get optionsEl(): HTMLElement {
        return this._optionsEl
    }
    private _titleEl: HTMLAnchorElement
    public get titleEl(): HTMLAnchorElement {
        return this._titleEl
    }

    constructor(rootEl: HTMLElement) {
        this._rootEl = rootEl
        this._optionsEl = rootEl.querySelector('td.lesson_options') as HTMLElement

        // lesson_url format - /subject/index/card/list-switcher/current/subject_id/12345
        this._titleEl = rootEl.querySelector('div#lesson_title a') as HTMLAnchorElement
        const id = parseInt(this._titleEl.href.split('/').slice(-1)[0])

        this._id = id
        this._url = `/subject/index/card/subject_id/${id}`
        this._newsUrl = `/news/index/index/subject_id/${id}/subject/subject`
        this._lessonsPlanUrl = `/lesson/list/my/subject_id/${id}`
        this._forumUrl = `/forum/subject/subject/${id}`
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
