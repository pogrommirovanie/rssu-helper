import { getSubjectButtonsContainer, SubjectListPageData } from '.'
import { createElementWithAttr } from '../../util/misc'

function insertSubjectMinimizeButton(pageData: SubjectListPageData) {
    const { subjects, pageStore } = pageData
    const minimzedSubjectsStore = pageStore.state.minimizedSubjects
    const minimizedSubjects = minimzedSubjectsStore.get() || {}

    subjects.forEach((subject) => {
        const { id, rootEl: rootSubjEl, additionalLinksContainer } = subject
        const isMinimized = () => (id in minimizedSubjects ? minimizedSubjects[id] : false)

        if (!additionalLinksContainer) console.error({ message: 'Unable to insert additional subject buttons', additionalLinksContainer })
        else {
            const buttonsContainer = getSubjectButtonsContainer(additionalLinksContainer)

            const minSubjectBtn = createElementWithAttr('div', { class: 'subject-minimize-button' })
            const onMinimizeUpdate = () => {
                minSubjectBtn.classList.toggle('active', isMinimized())
                const hideElements = [
                    '.lesson_bg #lesson_bg_img',
                    '.lesson_descript_td',
                    // '.ball-area .message-block',
                    '.lesson_options .lesson_teacher'
                ].flatMap((query) => {
                    const els = Array.from(rootSubjEl.querySelectorAll(query)) as HTMLElement[]
                    if (els.length == 0) console.warn('unable to find query ' + query)
                    return els
                })
                Array.from(rootSubjEl.querySelectorAll('#lesson_go p'))
                    .filter((el) =>
                        el.textContent?.match(/Семестр|Форма рубежного контроля|Дата начала обучения|Дата окончания обучения, не позднее/)
                    )
                    .forEach((el) => hideElements.push(el as HTMLElement))

                hideElements.forEach((el) => el.style.setProperty('display', isMinimized() ? 'none' : null))

                const scoreEl = rootSubjEl.querySelector('.ball-area') as HTMLElement
                scoreEl.classList.toggle('inline-message', isMinimized())

                minimzedSubjectsStore.set(minimizedSubjects)
            }
            onMinimizeUpdate()
            minSubjectBtn.addEventListener('click', (e) => {
                minimizedSubjects[id] = !isMinimized()
                onMinimizeUpdate()
            })

            buttonsContainer.append(minSubjectBtn)
        }
    })
}

export default insertSubjectMinimizeButton
