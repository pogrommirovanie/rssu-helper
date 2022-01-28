import { BrowserStore } from 'src/classes/store/browserStore'

export abstract class StoragePageScript<AT, ST extends BrowserStore> {
    abstract run(arg: AT, store: ST): void
    abstract renderStoreUpdate(arg: AT, store: ST): void
}
export abstract class SimplePageScript<AT> {
    abstract run(arg: AT): void
}
