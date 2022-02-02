/**
 * Base class for all scripts that need to render dynamic data updates.
 */
export abstract class DynamicPageScript<AT> {
    abstract run(arg: AT): void
    /**
     * Called when new data (obj variables/{@link BrowserStore} state) from {@param arg} needs to be rendered (usually - when window onfocus event is triggered).
     * */
    abstract renderDataUpdate(arg: AT): void
}
/**
 * Base class for all scripts that only run once and don't need to render dynamic data updates.
 */
export abstract class StaticPageScript<AT> {
    abstract run(arg: AT): void
}
