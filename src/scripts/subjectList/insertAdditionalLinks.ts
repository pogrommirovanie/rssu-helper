import { createElementWithAttr } from '../../util/misc'
import { SubjectListPageData } from '.'

export default function insertAdditionalSubjectLinks(pageData: SubjectListPageData) {
    const { subjects } = pageData
    subjects.forEach((subject) => {
        const { optionsEl: el, forumUrl, lessonsPlanUrl, newsUrl } = subject

        const subjectNewsAnchor = createElementWithAttr('a', { href: newsUrl }, 'Новости')
        const lessonsPlanAnchor = createElementWithAttr('a', { href: lessonsPlanUrl }, 'Все занятия')
        const subjectForumAnchor = createElementWithAttr('a', { href: forumUrl }, 'Форум')
        const additionalLinksDiv = createElementWithAttr('div', { class: 'additional-subject-links-container' }, [
            subjectNewsAnchor,
            lessonsPlanAnchor,
            subjectForumAnchor
        ])
        subject.additionalLinksContainer = additionalLinksDiv

        // FIXME: Hardcoded element index
        // Inserts additionalLinks container after lesson title
        el.insertBefore(additionalLinksDiv, el.childNodes.item(2))
    })
}
