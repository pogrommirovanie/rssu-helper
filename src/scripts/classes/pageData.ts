import { BrowserStore } from './browserStore'

export class PageScriptData<ST extends BrowserStore> {
    pagePath: string
    pagePathNoParam: string
    pageStore: ST
    constructor(pageStore: ST) {
        this.pagePath = window.location.pathname
        this.pagePathNoParam = this.pagePath.split('?')[0]
        this.pageStore = pageStore
    }
}
