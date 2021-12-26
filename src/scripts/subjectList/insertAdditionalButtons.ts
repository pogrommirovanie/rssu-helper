import { getSubjectButtonsContainer, SubjectListPageData } from '.'
import { createElementWithAttr } from '../../util/misc'

function insertSubjectNotesButtons(pageData: SubjectListPageData) {
    const { subjects, pageStore } = pageData
    const noteStoreEntry = pageStore.state.subjectNotes

    const notes = noteStoreEntry.get() || {}

    // TODO: Only update if there were changes (?count hash/set boolean when setting content or collapse properties)
    setInterval(() => {
        noteStoreEntry.set(notes)
    }, 1500)
    subjects.forEach((subject) => {
        const { id, optionsEl: el, additionalLinksContainer } = subject

        if (!notes[id]) notes[id] = { collapse: true, content: '' }
        const note = notes[id]

        const textarea = createElementWithAttr<HTMLTextAreaElement>('textarea', { class: 'subject-note-textarea' })
        textarea.value = note.content
        const resizeTextarea = (el: HTMLTextAreaElement) => {
            // https://stackoverflow.com/a/48460773
            el.style.height = '1px'
            el.style.height = `${Math.max(30, el.scrollHeight) + 5}px`
            // if (el.clientHeight != el.scrollHeight) el.style.height = `20px`
        }
        textarea.addEventListener('change', (e) => {
            const tArea = e.target as HTMLTextAreaElement
            note.content = tArea.value
        })
        const tareaResizeEvents = ['keypress', 'keydown', 'keyup', 'input', 'change']
        tareaResizeEvents.forEach((eName) => textarea.addEventListener(eName, (e) => resizeTextarea(e.target as HTMLTextAreaElement)))
        // Init textarea resize
        setTimeout(() => resizeTextarea(textarea), 100)

        const removeNoteButton = createElementWithAttr('div', { class: 'note-button remove' }, '')
        const addNoteButton = createElementWithAttr('div', { class: 'note-button add' }, '📝')
        const onNoteClick = (e: MouseEvent) => {
            note.collapse = !note.collapse
            onCollapseUpdate()
        }
        removeNoteButton.addEventListener('click', onNoteClick)
        addNoteButton.addEventListener('click', onNoteClick)
        // const collapseTareaButton = createElementWithAttr('div', { class: 'collapse-textarea-button' })
        const onCollapseUpdate = () => {
            addNoteButton.style.setProperty('display', note.collapse ? null : 'none')
            removeNoteButton.style.setProperty('display', note.collapse ? 'none' : null)
            textarea.classList.toggle('collapse', note.collapse)
            if (!note.collapse) resizeTextarea(textarea)
        }
        onCollapseUpdate()

        const subjectNoteContainerDiv = createElementWithAttr('div', { class: 'subject-note-container' }, [textarea, removeNoteButton])
        subject.noteContainer = subjectNoteContainerDiv
        if (!additionalLinksContainer) console.error({ message: 'Unable to insert additional subject buttons', additionalLinksContainer })
        else {
            const btnsContainer = getSubjectButtonsContainer(additionalLinksContainer)
            btnsContainer.append(addNoteButton)

            // Inserts additionalLinks container after additional links container
            el.insertBefore(subjectNoteContainerDiv, additionalLinksContainer.nextSibling as ChildNode)
        }

        //TODO: [LOW PRIOR] fetch total news count & last update. Optionally add links to individual news pages (or display 'no news')
        //TODO: Remember note textarea size/autoscale.
        //TODO: ?Foldable notes for each subject on pages, other than the main one.

        //      Persistence options:
        //          - cloud storage (dropbox, mega, etc.)
        //          - GM local storage ?incognito capability on diff browsers. More info:
        //                  https://www.reddit.com/r/GreaseMonkey/comments/pb760b/comment/ha9ura3
        //                  https://violentmonkey.github.io/api/gm/
        //                  https://wiki.greasespot.net/GM.setValue
    })
}

export default insertSubjectNotesButtons
