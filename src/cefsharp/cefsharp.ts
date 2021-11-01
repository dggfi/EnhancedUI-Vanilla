let displayedVersion: number = 0;
let rendering: boolean = false;
let {
    CefSharp,
    OnGameStateChange,
    TerminalViewModel,
} = window;

// The global Window namespace has been extended for this to compile in TS.
// See types.d.ts
OnGameStateChange = async (version: number): Promise<void> => {
    if (TerminalViewModel === undefined) return;
    if (rendering || version <= displayedVersion) return;

    rendering = true;
    try {
        let blockIds = await TerminalViewModel.GetModifiedBlockIds(displayedVersion);
        // ... to be implemented
    } finally {
        displayedVersion = version;
        rendering = false;
    }
}

export const startCefSharp = async () => {
    await CefSharp.BindObjectAsync("TerminalViewModel");
}