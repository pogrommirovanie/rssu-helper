import { SubjectListPageData } from 'src/pageManager/subjectList'
import SubjectListStore, { SubjectNoteData } from 'src/pageManager/subjectList/store'
import { StoragePageScript } from 'src/classes/pageScript/pageScripts'
import { SubjectNote } from './subjectNote'

class InsertSubjectNoteElsScript extends StoragePageScript<SubjectListPageData, SubjectListStore> {
    private subjectNotes: SubjectNote[] = []
    run(arg: SubjectListPageData, store: SubjectListStore): void {
        const { subjects } = arg
        const noteStoreEntry = store.state.subjectNotes

        const getNotes = () => noteStoreEntry.get() || {}
        let notes = getNotes()
        subjects.forEach((subject) => {
            const { id } = subject
            if (!notes[id]) notes[id] = { collapse: true, content: '' }
            const note = notes[id]

            const storeNote = (note: SubjectNoteData) => {
                notes = getNotes()
                notes[id] = note

                // Log for testing
                const { collapse, content } = note
                console.log('Storing note, collapse: ', collapse, '\ncontent:\n' + content)

                noteStoreEntry.set(notes)
            }
            const subjectNote = new SubjectNote(note, storeNote, subject)
            this.subjectNotes.push(subjectNote)
        })
    }
    renderStoreUpdate(arg: SubjectListPageData, store: SubjectListStore): void {
        const notes = store.state.subjectNotes.get() || {}

        // Log for testing
        const { collapse, content } = Object.values(notes)[0]
        console.log("Rendering store update. First subject's collapse:", collapse, '\ncontent:\n' + content)

        this.subjectNotes.forEach((subjectNote) => {
            const subjectId = subjectNote.getSubjectId()
            subjectNote.setNoteData(notes[subjectId])
        })
    }
}

export default InsertSubjectNoteElsScript
