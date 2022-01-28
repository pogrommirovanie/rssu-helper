import { scriptConfig } from 'src/config/index'
import { BrowserStore } from 'src/classes/store/browserStore'
import { RunScriptCondition } from './runScriptConditions'
import { StoragePageScript, SimplePageScript } from './pageScripts'

// TODO: ?Enforce scripts to accept generic argument type that's specified in scriptsManager to ensure type safety
export abstract class PageScriptsManager<ST extends BrowserStore> {
    // pagePath: string
    pageStore: ST
    pageScripts: { [x: string]: StoragePageScript<any, ST> | SimplePageScript<any> } = {}
    constructor(pageStore: ST, runOnPageLoadConditions: RunScriptCondition[]) {
        // this.pagePath = window.location.pathname
        this.pageStore = pageStore

        window.addEventListener('load', (ev: Event) => {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const conditions = [...runOnPageLoadConditions, ...scriptConfig.globalRunScriptConditions]
            const failedCondition = conditions.find((condition) => !condition.shouldLoadScript(ev))
            if (failedCondition == undefined) this.onPageLoad(ev)
        })
        window.addEventListener('focus', (ev) => this.onPageFocus(ev))
    }
    /**
     * This method is called when the window onload event is fired.
     * This is where all pageScripts and the scriptsManager itself should initialize (create all needed HTML elements, add eventListeners, etc.)
     */
    abstract onPageLoad(ev: Event): void
    /**
     * This method is called when the window onfocus event is fired, which means that the current tab became active,
     * and all running page scripts need to render store changes that could've been made on another tab
     */
    abstract onPageFocus(ev: FocusEvent): void
    runPageScripts(arg?: any, scripts = Object.values(this.pageScripts)) {
        this.callPageScriptsMethod('run', arg, scripts)
    }
    updatePageScripts(arg?: any, scripts = Object.values(this.pageScripts)) {
        this.callPageScriptsMethod('update', arg, scripts)
    }
    // TODO: [LOW PRIOR] Refactor, find a simpler way to run/update all scripts
    private callPageScriptsMethod(methodType: 'run' | 'update', arg?: any, scripts = Object.values(this.pageScripts)) {
        scripts.forEach((script) => {
            if (script instanceof SimplePageScript) {
                if (methodType == 'run') script.run(arg)
                else if (methodType == 'update') {
                    /* simplePageScripts don't need to be updated */
                } else console.error({ message: `Unable to call '${methodType}' method on script`, script })
            } else if (script instanceof StoragePageScript) {
                if (methodType == 'run') script.run(arg, this.pageStore)
                else if (methodType == 'update') script.renderStoreUpdate(arg, this.pageStore)
                else console.error({ message: `Unable to call '${methodType}' method on script`, script })
            } else {
                console.error({ msg: 'Unsupported page script type', script })
            }
        })
    }
}
