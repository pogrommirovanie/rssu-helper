// TODO: [LOW PRIOR] add more script run conditions (page events, detected text/el on page, etc.)

export abstract class RunScriptCondition {
    abstract shouldLoadScript(ev: Event): boolean
}
export class RunScriptFunctionCondition extends RunScriptCondition {
    private fn: (ev: Event) => boolean
    constructor(fn: (ev: Event) => boolean) {
        super()
        this.fn = fn
    }
    shouldLoadScript(ev: Event) {
        return this.fn(ev)
    }
}
export class RunScriptURLRegexCondition extends RunScriptCondition {
    private regex: RegExp
    private failOnMatch: boolean
    constructor(regex: RegExp, failOnMatch = false) {
        super()
        this.failOnMatch = failOnMatch
        this.regex = regex
    }
    shouldLoadScript(ev: Event): boolean {
        const match = this.regex.test(document.location.href)
        return this.failOnMatch ? !match : match
    }
}
