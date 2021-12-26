import runGlobalScript from './scripts/global'
import modifySubjectListPage from './scripts/subjectList'
import './styles/index.less'

// TODO: Create boilerplate repostiory for other GM scripts
// TODO: Try to decrease time to responsive by making /techsupport/ajax/get-form & es/events/get?types async

function runScripts() {
    // This prevents script from running when load event is fired on .css and .js files
    const isJsCssPage = ['js', 'css'].includes(window.location.pathname.split('.').pop() + '')
    const isElearningHypermethodWebsite = !!document.body.innerHTML.search(/eLearning|hypermethod|гипер\s?метод/i)
    if (!isElearningHypermethodWebsite || isJsCssPage) return

    const path = window.location.pathname.split('?')[0]
    console.log('RSSU helper script is loaded. Page path: ' + path)

    runGlobalScript()

    if (['/subject/list/list/list-switcher/current', '/subject/list'].includes(path)) {
        console.log('on subject list, displaying additional subject info')
        modifySubjectListPage()
    }
}

// TODO: [LOW PRIOR] run scripts for url matchers w/ triggers for running scripts on page events or some other conditions
window.addEventListener('load', runScripts)
