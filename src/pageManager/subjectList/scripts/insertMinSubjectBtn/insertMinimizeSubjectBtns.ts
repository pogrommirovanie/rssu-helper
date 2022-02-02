import { SubjectListPageData } from 'src/pageManager/subjectList'
import { DynamicPageScript } from 'src/classes/pageScript/pageScripts'
import { MinimizeButton } from './minimizeButton'

class InsertMinimizeSubjectBtns extends DynamicPageScript<SubjectListPageData> {
    private minimizeButtonWrappers: MinimizeButton[] = []
    run(arg: SubjectListPageData): void {
        const subjects = arg.getSubjects()
        const store = arg.getStore()
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
    renderDataUpdate(arg: SubjectListPageData): void {
        const store = arg.getStore()
        const storeMinSubjects = store.state.minimizedSubjects.get() || {}
        this.minimizeButtonWrappers.forEach((minBtnWrapper) => (minBtnWrapper.minimized = storeMinSubjects[minBtnWrapper.subjectId]))
    }
}

export default InsertMinimizeSubjectBtns
