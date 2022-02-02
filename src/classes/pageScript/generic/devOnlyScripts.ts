import { StaticPageScript } from 'src/classes/pageScript/pageScripts'

export interface DevModeWrapper {
    getDevMode: () => boolean
    setDevMode: (devMode: boolean) => void
}

export default abstract class StaticDevOnlyScript<AT extends DevModeWrapper> extends StaticPageScript<AT> {
    run(arg: AT): void {
        const doc: any = document
        doc.rssuHelperSetDevMode = arg.setDevMode
        if (arg.getDevMode()) this.runIfDev()
    }
    abstract runIfDev(): void
}
