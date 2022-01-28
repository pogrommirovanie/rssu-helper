import { ParsedSubjectEl } from 'src/pageManager/subjectList/parsers/parsedSubjectEl'
import { createElementWithAttr } from 'src/util/misc'

export class MinimizeButton {
    // selector for grade/total subject score - '.ball-area .message-block'
    private static HIDE_SELECTOR_QUERIES: readonly string[] = ['.lesson_bg #lesson_bg_img', '.lesson_descript_td', '.lesson_options .lesson_teacher']
    private subject: ParsedSubjectEl
    getSubjectId = (): number => this.subject.id
    private storeMinimized: (min: boolean) => void
    private minSubjectBtn: HTMLElement
    //#region internal state, getters and setters
    private _minimized!: boolean
    get minimized() {
        return this._minimized
    }
    set minimized(min: boolean) {
        this._minimized = min
        this.renderMinimizedUpdate()
        this.storeMinimized(min)
    }
    //#endregion
    constructor(subject: ParsedSubjectEl, minimized: boolean, storeMinimized: (min: boolean) => void) {
        this.subject = subject
        this.storeMinimized = storeMinimized
        const buttonsContainer = subject.getSubjectButtonsContainer()
        this.minSubjectBtn = createElementWithAttr('div', { class: 'subject-minimize-button' })
        this.minSubjectBtn.addEventListener('click', (e) => (this.minimized = !this.minimized))
        this.minSubjectBtn = buttonsContainer.appendChild(this.minSubjectBtn)

        this.minimized = minimized
    }
    private renderMinimizedUpdate(): void {
        const rootSubjEl = this.subject.rootEl
        this.minSubjectBtn.classList.toggle('active', this.minimized)
        const hideElements = MinimizeButton.HIDE_SELECTOR_QUERIES.flatMap((query) => {
            const els = Array.from(rootSubjEl.querySelectorAll(query)) as HTMLElement[]
            if (els.length == 0) console.warn('unable to find query ' + query)
            return els
        })
        Array.from(rootSubjEl.querySelectorAll('#lesson_go p'))
            .filter((el) => el.textContent?.match(/Семестр|Форма рубежного контроля|Дата начала обучения|Дата окончания обучения, не позднее/))
            .forEach((el) => hideElements.push(el as HTMLElement))

        hideElements.forEach((el) => el.style.setProperty('display', this.minimized ? 'none' : null))

        const scoreEl = rootSubjEl.querySelector<HTMLElement>('.ball-area') as HTMLElement
        scoreEl.classList.toggle('inline-message', this.minimized)
    }
}
