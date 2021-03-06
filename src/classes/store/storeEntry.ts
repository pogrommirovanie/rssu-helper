// TODO: ?Extend this class, (make JSONValue variables & set, get methods)

export class StoreEntry<T extends JSONObject> {
    private key: Readonly<string>
    private storeGet: () => T | undefined
    private storeSet: (data?: T) => void
    constructor(key: string, storeGet: () => T | undefined, storeSet: (data?: T) => void) {
        this.key = key
        this.storeGet = storeGet
        this.storeSet = storeSet
    }
    get(): T | undefined {
        return this.storeGet()
    }
    set(data: T | undefined): void {
        this.storeSet(data)
    }
}

type BaseStoreScopeData = { type: 'global' } | { type: 'pageScript'; pageScriptName: string }
// eslint-disable-next-line @typescript-eslint/ban-types
type StoreScopeDataOptions = {}
export type StoreScopeData = BaseStoreScopeData & { options?: StoreScopeDataOptions }
