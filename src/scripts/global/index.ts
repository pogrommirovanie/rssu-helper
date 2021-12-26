import { globalConfig } from '../../config'
import { createElementWithAttr } from '../../util/misc'

export default function runGlobalScript() {
    const { projectPageURL, badgeDisplayVersion } = globalConfig
    const scriptBadgeContainer = createElementWithAttr('a', { class: 'extension-badge-container', href: projectPageURL, target: '_blank' }, [
        createElementWithAttr('div', { class: 'extension-badge-icon' }, ' '),
        createElementWithAttr('div', { class: 'extension-badge-version' }, 'RSSU Helper v' + badgeDisplayVersion)
    ])
    document.querySelector('.els-content.els-box')?.appendChild(scriptBadgeContainer)
}
