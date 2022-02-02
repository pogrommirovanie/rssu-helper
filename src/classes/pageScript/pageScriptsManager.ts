import { scriptConfig } from 'src/config/index'
import { RunScriptCondition } from './runScriptConditions'
import { DynamicPageScript, StaticPageScript } from './pageScripts'

export type GenericPageScript<AT> = DynamicPageScript<AT> | StaticPageScript<AT>
type PageScriptsManagerOptions<AT> = {
    runScriptConditions?: RunScriptCondition[]
    // pageScripts?: { [x: string]: GenericPageScript<AT> }
}
export abstract class PageScriptsManager<AT> {
    private checkedConditions = false
    protected runScriptConditions: RunScriptCondition[]
    protected pageScripts: { [x: string]: GenericPageScript<AT> } = {}
    constructor({ runScriptConditions = [] }: PageScriptsManagerOptions<AT>) {
        this.runScriptConditions = runScriptConditions
    }
    tryToEnable(): void {
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
     * All pageScripts and the scriptsManager itself should initialize (modify DOM, create HTML elements, add event listeners, etc.) when this method is called
     */
    protected onPageScriptsEnabled(): void {
        this.runPageScripts(this.supplyScriptArgument())
    }
    /**
     * This method is called when the window onfocus event is fired, which means that the current tab became active.
     * When this happens, all running page scripts need to render possible store changes that were made on another tab
     */
    protected onPageFocus(onFocusEvent: FocusEvent): void {
        this.updatePageScripts(this.supplyScriptArgument())
    }
    protected abstract supplyScriptArgument(): AT
    protected runPageScripts(arg: AT = this.supplyScriptArgument(), scripts = Object.values(this.pageScripts)) {
        scripts.forEach((script) => script.run(arg))
    }
    protected updatePageScripts(arg: AT = this.supplyScriptArgument(), scripts = Object.values(this.pageScripts)) {
        scripts.forEach((script) => {
            if (script instanceof DynamicPageScript) script.renderDataUpdate(arg)
        })
    }
}
