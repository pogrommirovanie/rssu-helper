import { RunScriptFunctionCondition, RunScriptURLRegexCondition } from 'src/classes/pageScript/runScriptConditions'

export const storeConfig = Object.freeze({
    gmDataPrefix: 'script-data-'
})

export const globalConfig = Object.freeze({
    projectPageURL: 'https://pogrommirovanie.github.io/rssu-helper',
    badgeDisplayVersion: __VERSION__
})

export const scriptConfig = Object.freeze({
    globalRunScriptConditions: Object.freeze([
        new RunScriptURLRegexCondition(/\.(js|css)$/g, true),
        new RunScriptFunctionCondition(() => /eLearning|hypermethod|гипер\s?метод/i.test(document.body.innerHTML))
    ])
})
