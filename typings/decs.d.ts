// JSON-serializable type definition: https://github.com/microsoft/TypeScript/issues/1897#issuecomment-822032151

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface JSONArray extends Array<JSONValue> {}
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }
declare interface JSONObject {
    [k: string]: JSONValue
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface JSONArray extends Array<JSONValue> {}

declare const __VERSION__: string

declare function GM_setValue(key: string, value: any): void
declare function GM_deleteValue(key: string): void
declare function GM_getValue(key: string, defaultValue?: any): any
// type TGM = {
//     setValue(key: string, value: any): void
//     deleteValue(key: string): void
//     getValue(key: string, defaultValue?: any): any
// }
// declare const GM: TGM
