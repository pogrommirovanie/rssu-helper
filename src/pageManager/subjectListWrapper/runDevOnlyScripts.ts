import { SimplePageScript } from 'src/classes/pageScript/pageScripts'
import { SubjListWrapperData } from '.'

export default class RunDevOnlyScripts extends SimplePageScript<SubjListWrapperData> {
    private devScripts: { [x: string]: SimplePageScript<SubjListWrapperData> }
    constructor(devScripts: { [x: string]: SimplePageScript<SubjListWrapperData> }) {
        super()
        this.devScripts = devScripts
    }
    run(arg: SubjListWrapperData): void {
        const { getDevMode, setDevMode } = arg

        // Make setDevMode method accessible through browser console (call document.rssuHelperSetDevMode(true))
        const doc: any = document
        doc.rssuHelperSetDevMode = setDevMode

        if (getDevMode()) {
            Object.values(this.devScripts).forEach((script) => script.run(arg))
        }
    }
}
