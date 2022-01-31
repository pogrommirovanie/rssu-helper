import { scriptConfig } from 'src/config/index'
import { BrowserStore } from 'src/classes/store/browserStore'
import { RunScriptCondition } from './runScriptConditions'
import { StoragePageScript, SimplePageScript } from './pageScripts'

export type GenericPageScript<AT, ST extends BrowserStore> = StoragePageScript<AT, ST> | SimplePageScript<any>
type PageScriptsManagerOptions<AT, ST extends BrowserStore> = {
    pageStore: ST
    runScriptConditions?: RunScriptCondition[]
}
export abstract class PageScriptsManager<AT, ST extends BrowserStore> {
    private checkedConditions = false
    protected pageStore: ST
    protected runScriptConditions: RunScriptCondition[]
    protected pageScripts: { [x: string]: GenericPageScript<AT, ST> } = {}
    constructor({ pageStore, runScriptConditions = [] }: PageScriptsManagerOptions<AT, ST>) {
        this.pageStore = pageStore
        this.runScriptConditions = runScriptConditions
    }
    checkRunScriptConditions(): void {
        if (this.checkedConditions) return
        this.checkedConditions = true

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const conditions = [...this.runScriptConditions, ...scriptConfig.globalRunScriptConditions]
        const failedCondition = conditions.find((condition) => !condition.shouldLoadScript())
        if (failedCondition == undefined) {
            this.onPageScriptsEnabled()
            window.addEventListener('focus', (onFocusEvent) => this.onPageFocus(onFocusEvent))
        }
    }
    /**
     * All pageScripts and the scriptsManager itself should initialize (create/insert all needed HTML elements, add event listeners, etc.)
     */
    protected abstract onPageScriptsEnabled(): void
    /**
     * This method is called when the window onfocus event is fired, which means that the current tab became active,
     * and all running page scripts need to render store changes that could've been made on another tab
     */
    protected abstract onPageFocus(onFocusEvent: FocusEvent): void
    protected runPageScripts(arg: AT, scripts = Object.values(this.pageScripts)) {
        this.callPageScriptsMethod('run', arg, scripts)
    }
    protected updatePageScripts(arg?: AT, scripts = Object.values(this.pageScripts)) {
        this.callPageScriptsMethod('update', arg, scripts)
    }
    // TODO: [LOW PRIOR] Refactor, find a simpler way to run/update all scripts
    private callPageScriptsMethod(methodType: 'run' | 'update', arg?: AT, scripts = Object.values(this.pageScripts)) {
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
