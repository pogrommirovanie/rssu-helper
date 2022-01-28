import { SubjectListPageData } from 'src/pageManager/subjectList'
import { StoragePageScript } from 'src/classes/pageScript/pageScripts'
import SubjectListStore from 'src/pageManager/subjectList/store'
import { MinimizeButton } from './minimizeButton'

class InsertMinimizeSubjectBtns extends StoragePageScript<SubjectListPageData, SubjectListStore> {
    private minimizeButtonWrappers: MinimizeButton[] = []
    run(arg: SubjectListPageData, store: SubjectListStore): void {
        const { subjects } = arg
        const minimzedSubjectsStore = store.state.minimizedSubjects
        const storeMinSubjects = minimzedSubjectsStore.get() || {}

        subjects.forEach((subject) => {
            const { id } = subject
            const minimized = id in storeMinSubjects ? storeMinSubjects[id] : false
            const setMinimzied = (min: boolean) => {
                const storeSubjects = minimzedSubjectsStore.get() || {}
                storeSubjects[id] = min
                minimzedSubjectsStore.set(storeSubjects)
            }
            this.minimizeButtonWrappers.push(new MinimizeButton(subject, minimized, setMinimzied))
        })
    }
    renderStoreUpdate(arg: SubjectListPageData, store: SubjectListStore): void {
        const storeMinSubjects = store.state.minimizedSubjects.get() || {}
        this.minimizeButtonWrappers.forEach((minBtnWrapper) => (minBtnWrapper.minimized = storeMinSubjects[minBtnWrapper.getSubjectId()]))
    }
}

export default InsertMinimizeSubjectBtns
