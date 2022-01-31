import { ParsedSubjectEl } from 'src/pageManager/subjectList/parsers/parsedSubjectEl'
import { SubjectNoteData } from 'src/pageManager/subjectList/subjectListStore'
import { createElementWithAttr } from 'src/util/misc'

export class SubjectNote {
    private static TAREA_RESIZE_EVENTS: readonly string[] = Object.freeze(['keypress', 'keydown', 'keyup', 'input'])
    private parsedSubject: ParsedSubjectEl
    private storeNoteData: () => void
    //#region DOM elements
    private textarea!: HTMLTextAreaElement
    private removeNoteButton!: HTMLElement
    private addNoteButton!: HTMLElement
    private subjectNoteContainer!: HTMLDivElement
    //#endregion
    //#region internal state, getters & setters
    getSubjectId = () => this.parsedSubject.id
    private content: string
    getContent = () => this.content
    private collapse: boolean
    getCollapse = () => this.collapse
    //#endregion
    constructor({ content, collapse }: SubjectNoteData, storeData: (note: SubjectNoteData) => void, parsedSubject: ParsedSubjectEl) {
        this.content = content
        this.collapse = collapse
        this.storeNoteData = () => storeData({ content: this.content, collapse: this.collapse })

        this.parsedSubject = parsedSubject
        this.createTextarea()
        this.createNoteButtons()
        this.createNoteContainer()

        this.onNoteCollapseUpdate()
        this.onNoteContentUpdate()
    }
    //#region create additional subject elements
    // TODO: Don't mix HTML element creation w/ logic/data handling, by creating static elements from a pre-made template in a sep. method
    private createTextarea() {
        const textarea = createElementWithAttr<HTMLTextAreaElement>('textarea', { class: 'subject-note-textarea' })
        textarea.value = this.content
        textarea.addEventListener('input', (e) => {
            this.content = (e.target as HTMLTextAreaElement).value
            this.storeNoteData()
        })
        SubjectNote.TAREA_RESIZE_EVENTS.forEach((eName) => this.textarea?.addEventListener(eName, (e) => this.resizeTextarea()))
        // FIXME: [LOW PRIOR] resize note textarea workaround, doesn't work without a small delay
        setTimeout(() => this.resizeTextarea(), 100)
        this.textarea = textarea
    }
    private createNoteButtons() {
        this.removeNoteButton = createElementWithAttr('div', { class: 'note-button remove' }, '')
        this.addNoteButton = createElementWithAttr('div', { class: 'note-button add' }, '📝')
        const onNoteClick = (e: MouseEvent) => {
            this.collapse = !this.collapse
            this.storeNoteData()
            this.onNoteCollapseUpdate(this.addNoteButton, this.removeNoteButton)
        }
        this.removeNoteButton.addEventListener('click', onNoteClick)
        this.addNoteButton.addEventListener('click', onNoteClick)
    }
    private createNoteContainer() {
        this.subjectNoteContainer = createElementWithAttr<HTMLDivElement>('div', { class: 'subject-note-container' }, [
            this.textarea,
            this.removeNoteButton
        ])
        const subjAdditionalLinksContainer = this.parsedSubject.getAdditionalLinksContainer()
        this.parsedSubject.getSubjectButtonsContainer().append(this.addNoteButton)
        // Inserts .subject-note-container container after .additional-subject-links-container
        this.parsedSubject.optionsEl.insertBefore(this.subjectNoteContainer, subjAdditionalLinksContainer.nextSibling as ChildNode)
    }
    //#endregion
    //#region store methods (set/render updates)
    setNoteData({ collapse, content }: SubjectNoteData) {
        this.collapse = collapse
        this.content = content
        this.onNoteCollapseUpdate()
        this.onNoteContentUpdate()
    }
    private onNoteCollapseUpdate(addNoteButton = this.addNoteButton, removeNoteButton = this.removeNoteButton) {
        addNoteButton.style.setProperty('display', this.collapse ? null : 'none')
        removeNoteButton.style.setProperty('display', this.collapse ? 'none' : null)
        this.textarea.classList.toggle('collapse', this.collapse)
        if (!this.collapse) this.resizeTextarea()
    }
    private onNoteContentUpdate() {
        this.textarea.value = this.content
        this.resizeTextarea()
    }
    //#endregion
    //#region utils
    private resizeTextarea() {
        const tarea = this.textarea as HTMLTextAreaElement
        // https://stackoverflow.com/a/48460773
        tarea.style.height = '1px'
        tarea.style.height = `${Math.max(30, tarea.scrollHeight) + 5}px`
        // if (el.clientHeight != el.scrollHeight) el.style.height = `20px`
    }
}
