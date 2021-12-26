import { BrowserStore } from '../../classes/browserStore'

class SubjectListStore extends BrowserStore {
    // TODO: Refactor, pass created store to another script/page class
    state = {
        subjectNotes: this.createStoreEntryObject<Record<string, { content: string; collapse: boolean }>>('subjectNotes', {}),
        minimizedSubjects: this.createStoreEntryObject<Record<string, boolean>>('minimizedSubjects', {})
    }
    constructor() {
        super({ type: 'pageScript', pageScriptName: 'subjectList' })
    }
}

const subjectListStore = new SubjectListStore()

export default subjectListStore
