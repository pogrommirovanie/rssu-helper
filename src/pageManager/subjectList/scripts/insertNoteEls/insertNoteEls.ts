import { SubjectListPageData } from 'src/pageManager/subjectList'
import { SubjectNoteData } from 'src/pageManager/subjectList/subjectListStore'
import { DynamicPageScript } from 'src/classes/pageScript/pageScripts'
import { SubjectNote } from './subjectNote'

class InsertSubjectNoteElsScript extends DynamicPageScript<SubjectListPageData> {
    private subjectNotes: SubjectNote[] = []
    private getNoteForId(notes: Record<string, SubjectNoteData>, id: number | string) {
        return notes[id + ''] || { collapse: true, content: '' }
    }
    run(arg: SubjectListPageData): void {
        const subjects = arg.getSubjects()
        const store = arg.getStore()
        const noteStoreEntry = store.state.subjectNotes

        const getNotes = () => noteStoreEntry.get() || {}
        let notes = getNotes()
        subjects.forEach((subject) => {
            const { id } = subject
            const note = this.getNoteForId(notes, id)

            const storeNote = (note: SubjectNoteData) => {
                notes = getNotes()
                notes[id] = note

                // Log for testing
                // const { collapse, content } = note
                // console.log('Storing note, collapse: ', collapse, '\ncontent:\n' + content)

                noteStoreEntry.set(notes)
            }
            const subjectNote = new SubjectNote(note, storeNote, subject)
            this.subjectNotes.push(subjectNote)
        })
    }
    renderDataUpdate(arg: SubjectListPageData): void {
        const store = arg.getStore()
        const notes = store.state.subjectNotes.get() || {}

        // Log for testing
        // const { collapse, content } = Object.values(notes)[0]
        // console.log("Rendering store update. First subject's collapse:", collapse, '\ncontent:\n' + content)

        this.subjectNotes.forEach((subjectNote) => {
            const subjectId = subjectNote.getSubjectId()
            const noteData = this.getNoteForId(notes, subjectId)
            subjectNote.setNoteData(noteData)
        })
    }
}

export default InsertSubjectNoteElsScript
