import { BrowserStore } from 'src/classes/store/browserStore'

export type SubjectNoteData = { content: string; collapse: boolean }

class SubjectListStore extends BrowserStore {
    state = {
        subjectNotes: this.createStoreEntryObject<Record<string, SubjectNoteData>>('subjectNotes', {}),
        minimizedSubjects: this.createStoreEntryObject<Record<string, boolean>>('minimizedSubjects', {})
    }
    private constructor() {
        super({ type: 'pageScript', pageScriptName: 'subjectList' })
    }
    private static instance?: SubjectListStore
    static getInstance() {
        let instance = SubjectListStore.instance
        if (!instance) {
            instance = new SubjectListStore()
            SubjectListStore.instance = instance
        }
        return instance
    }
}

export default SubjectListStore
