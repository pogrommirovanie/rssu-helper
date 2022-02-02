import { createElementWithAttr } from 'src/util/misc'
import { SubjectListPageData } from 'src/pageManager/subjectList'
import { StaticPageScript } from 'src/classes/pageScript/pageScripts'

class InsertAdditionalLinks extends StaticPageScript<SubjectListPageData> {
    run(arg: SubjectListPageData): void {
        const subjects = arg.getSubjects()
        subjects.forEach((subject) => {
            const { forumUrl, lessonsPlanUrl, newsUrl } = subject

            const subjectNewsAnchor = createElementWithAttr('a', { href: newsUrl }, 'Новости')
            const lessonsPlanAnchor = createElementWithAttr('a', { href: lessonsPlanUrl }, 'Все занятия')
            const subjectForumAnchor = createElementWithAttr('a', { href: forumUrl }, 'Форум')
            subject.getAdditionalLinksContainer().append(subjectNewsAnchor, lessonsPlanAnchor, subjectForumAnchor)
        })
    }
}

export default InsertAdditionalLinks
