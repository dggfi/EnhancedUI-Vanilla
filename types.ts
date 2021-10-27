export {};

declare global {
    interface Window {
        state: any,
        CefSharp: any,
        stateUpdated: Function
    }
}