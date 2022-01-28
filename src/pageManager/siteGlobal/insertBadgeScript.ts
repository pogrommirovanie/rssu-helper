import { SimplePageScript } from 'src/classes/pageScript/pageScripts'
import { globalConfig } from 'src/config'
import { createElementWithAttr } from 'src/util/misc'

export default class InsertBadgeScript extends SimplePageScript<undefined> {
    run(arg: undefined): void {
        const { projectPageURL, badgeDisplayVersion } = globalConfig
        const scriptBadgeContainer = createElementWithAttr('a', { class: 'extension-badge-container', href: projectPageURL, target: '_blank' }, [
            createElementWithAttr('div', { class: 'extension-badge-icon' }, ' '),
            createElementWithAttr('div', { class: 'extension-badge-version' }, 'RSSU Helper v' + badgeDisplayVersion)
        ])
        document.querySelector('.els-content.els-box')?.appendChild(scriptBadgeContainer)

        const path = window.location.pathname.split('?')[0]
        console.log('RSSU helper script is loaded. Page path: ' + path)
    }
}
