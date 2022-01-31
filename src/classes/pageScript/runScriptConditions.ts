// TODO: [LOW PRIOR] add more script run conditions (page events, detected text/el on page, etc.)

export abstract class RunScriptCondition {
    abstract shouldLoadScript(): boolean
}
export class RunScriptFunctionCondition extends RunScriptCondition {
    private fn: () => boolean
    constructor(fn: () => boolean) {
        super()
        this.fn = fn
    }
    shouldLoadScript() {
        return this.fn()
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
    shouldLoadScript(): boolean {
        const match = this.regex.test(document.location.href)
        return this.failOnMatch ? !match : match
    }
}
