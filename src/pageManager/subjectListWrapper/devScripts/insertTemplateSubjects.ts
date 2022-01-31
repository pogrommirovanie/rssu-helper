import { SimplePageScript } from 'src/classes/pageScript/pageScripts'
import { SubjListWrapperData } from 'src/pageManager/subjectListWrapper'

export default class InsertTemplateSubjects extends SimplePageScript<SubjListWrapperData> {
    run(arg: SubjListWrapperData): void {
        const lessonHTMLs = [
            createLessonFromTemplate('Безопасность жизнедеятельности', 66115, 'ФИТ-АБВ-Г-0-Д-2021-А', 5130, 1507, {
                theory1: 13,
                task1: 14,
                test1: 15,
                encouragement: 16,
                exam: 17,
                lectures: 18
            }),
            createLessonFromTemplate('Английский язык', 66126, 'ФИТ-АБВ-Г-0-Д-2021-А', 1005, 1505, {
                theory1: 7,
                task1: 8,
                test1: 9,
                encouragement: 10,
                exam: 11,
                lectures: 12
            }),
            createLessonFromTemplate('История', 66342, 'ФИТ-АБВ-Г-0-Д-2021-А', 1000, 1500, {
                theory1: 1,
                task1: 2,
                test1: 3,
                encouragement: 4,
                exam: 5,
                lectures: 6
            })
        ]
        lessonHTMLs.forEach((lessonHTML) => {
            const createdLessonContainer = document.createElement('div')
            createdLessonContainer.innerHTML = lessonHTML.trim()
            const lessonContainer = document.querySelector('.els-content.els-box') as HTMLDivElement
            console.log(
                lessonContainer.insertBefore(
                    createdLessonContainer.firstChild as HTMLDivElement,
                    lessonContainer.querySelector('.hm-page-support') as HTMLElement
                )
            )
        })
    }
}

function createLessonFromTemplate(
    subject_title: string,
    subject_id: number,
    group_name: string,
    teacher_id_1: number,
    teacher_id_2: number,
    lesson_ids: { theory1: number; task1: number; test1: number; encouragement: number; exam: number; lectures: number }
) {
    const subjectTemplate = `
    <div class="lesson">
        <a name="lesson_${subject_id}"></a>
        <div class="lesson_wrapper_1">
            <div class="lesson_wrapper_2">
                <div class="lesson_block">
                    <div class="lesson_table">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr>
                                    <td class="lesson_bg" width="109" valign="top" align="center">
                                        <div id="lesson_bg_img">
                                            <a href="https://sdo.rgsu.net/subject/index/card/list-switcher/current/subject_id/${subject_id}">
                                                <img
                                                    class="subject-icon"
                                                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxMDI0IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MTIgNzY4SDBWMjU2aDUxMlY3Njh6Ii8+PC9zdmc+"
                                                    alt="${subject_title}"
                                                    title="${subject_title}"
                                                />
                                            </a>
                                        </div>
                                        <div id="lesson_type">Дистанционный</div>
                                    </td>
                                    <td class="lesson_options" width="450">
                                        <div id="lesson_title">
                                            <a href="https://sdo.rgsu.net/subject/index/card/list-switcher/current/subject_id/${subject_id}"> ${subject_title} </a>
                                        </div>

                                        <div style="padding: 0px 10px 0px 15px;">
                                            <p>
                                                <span class="subject-info-caption">Программа</span>
                                                : ${group_name}
                                            </p>
                                        </div>

                                        <div id="lesson_go">
                                            <div id="lesson_begin">
                                                <p>
                                                    <span class="subject-info-caption">Дата начала обучения:</span>
                                                    01.09.2021
                                                </p>

                                                <p><span class="subject-info-caption">Дата окончания обучения, не позднее:</span> 25.01.2022</p>
                                            </div>
                                        </div>
                                        <div id="lesson_go">
                                            <p><span class="subject-info-caption">Форма рубежного контроля</span>: Зачет</p>
                                        </div>

                                        <div id="lesson_go">
                                            <p><span class="subject-info-caption">Семестр</span>: <span class="subject-info-value">1</span></p>
                                        </div>

                                        <div class="lesson_teacher">
                                            Тьюторы:
                                            <div>
                                                <a href="https://sdo.rgsu.net/user/list/view/list-switcher/current/user_id/${teacher_id_1}" class="pcard-link lightbox" target="_blank" rel="pcard" title="Карточка">
                                                    <img
                                                        src='/images/content-modules/grid/card.gif'
                                                        title="Карточка"
                                                        class="ui-els-icon"
                                                        style="
                                                            background-blend-mode: normal !important;
                                                            background-clip: content-box !important;
                                                            background-position: 50% 50% !important;
                                                            background-color: rgba(0, 0, 0, 0) !important;
                                                            background-image: var(--sf-img-22) !important;
                                                            background-size: 100% 100% !important;
                                                            background-origin: content-box !important;
                                                            background-repeat: no-repeat !important;
                                                        "
                                                    />
                                                </a>
                                                Преподаватель 1
                                            </div>
                                            <div>
                                                <a href="https://sdo.rgsu.net/user/list/view/list-switcher/current/user_id/${teacher_id_2}" class="pcard-link lightbox" target="_blank" rel="pcard" title="Карточка">
                                                    <img
                                                        src='/images/content-modules/grid/card.gif'
                                                        title="Карточка"
                                                        class="ui-els-icon"
                                                        style="
                                                            background-blend-mode: normal !important;
                                                            background-clip: content-box !important;
                                                            background-position: 50% 50% !important;
                                                            background-color: rgba(0, 0, 0, 0) !important;
                                                            background-image: var(--sf-img-22) !important;
                                                            background-size: 100% 100% !important;
                                                            background-origin: content-box !important;
                                                            background-repeat: no-repeat !important;
                                                        "
                                                    />
                                                </a>
                                                Преподаватель 2
                                            </div>
                                        </div>
                                    </td>
                                    <td class="showscore ball-area" data-id="${subject_id}" id="ball-area-${subject_id}" width="100" valign="top" align="center">
                                        <div class="score-block hidden sf-hidden"></div>
                                        <div style="clear: both;" class="message-block hidden sf-hidden"></div>
                                    </td>
                                    <td class="lesson_descript_td" id="hm-subject-list-item-description-container-1" width="150" valign="top">
                                        <div class="hm-subject-list-item-description ui-tabs ui-widget ui-widget-content ui-corner-all">
                                            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                                                <li class="ui-state-default ui-corner-top ui-tabs-selected ui-state-active">
                                                    <a href="#hm-subject-list-item-description-1-lessons">
                                                        <span>
                                                            <div class="gradient-me sf-hidden"></div>
                                                            <span>Занятия</span>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li class="ui-state-default ui-corner-top">
                                                    <a href="#hm-subject-list-item-description-1-progress">
                                                        <span>
                                                            <div class="gradient-me sf-hidden"></div>
                                                            <span>Прогресс</span>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li class="ui-state-default ui-corner-top">
                                                    <a href="#hm-subject-list-item-description-1-events">
                                                        <span>
                                                            <div class="gradient-me sf-hidden"></div>
                                                            <span>Обновления</span>
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div id="hm-subject-list-item-description-1-lessons" class="hm-subject-list-item-description-lessons ui-tabs-panel ui-widget-content ui-corner-bottom" style="height: 126px;">
                                                <ul>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">0 из 0</div>
                                                        <div class="hm-subject-list-item-description-lesson-title"><a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.theory1}/subject_id/${subject_id}">${subject_title} (раздел 1)</a></div>
                                                    </li>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">(Выставлена оценка) 0 из 20</div>
                                                        <div class="hm-subject-list-item-description-lesson-title"><a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.task1}/subject_id/${subject_id}">${subject_title} (практическое задание 1)</a></div>
                                                    </li>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">14.25 из 15</div>
                                                        <div class="hm-subject-list-item-description-lesson-title"><a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.test1}/subject_id/${subject_id}">${subject_title} - Рубежный тест 1</a></div>
                                                    </li>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">(Выставлена оценка) 0 из 10</div>
                                                        <div class="hm-subject-list-item-description-lesson-title"><a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.encouragement}/subject_id/${subject_id}">Поощрение</a></div>
                                                    </li>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">(Выдано задание) 0 из 20</div>
                                                        <div class="hm-subject-list-item-description-lesson-title">
                                                            <a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.exam}/subject_id/${subject_id}">Итоговый контроль (Зачет/Экзамен/Диф.зачет) очно</a>
                                                        </div>
                                                    </li>
                                                    <li class="hm-subject-list-item-description-lesson hm-subject-list-item-description-lesson-free">
                                                        <div class="hm-subject-list-item-description-lesson-date">∞</div>
                                                        <div class="lesson-status-tab">10 из 10</div>
                                                        <div class="hm-subject-list-item-description-lesson-title"><a href="https://sdo.rgsu.net/lesson/execute/index/lesson_id/${lesson_ids.lectures}/subject_id/${subject_id}">Журнал - лекция</a></div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                id="hm-subject-list-item-description-1-progress"
                                                class="hm-subject-list-item-description-progress ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide sf-hidden"
                                                style="height: 126px;"
                                            ></div>
                                            <div
                                                id="hm-subject-list-item-description-1-events"
                                                class="hm-subject-list-item-description-events ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide sf-hidden"
                                                style="height: 126px;"
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return subjectTemplate
}
