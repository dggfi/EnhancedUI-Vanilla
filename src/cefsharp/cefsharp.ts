import { useEffect, useState } from "react";
import { IBlockViewModel } from "../../types";
import { Subject } from 'rxjs';

// The global Window namespace has been extended for this to compile in TS.
// See types.d.ts
let {
    CefSharp,
} = window;

export interface IBlockStatesContainer { [key: number]: IBlockViewModel }
export let blockStates: IBlockStatesContainer = {}
export const gameStateSubject = new Subject<IBlockStatesContainer>();

export const useGameState = () => {
    let [state, setState] = useState<IBlockStatesContainer>({});

    useEffect(() => {
        let subscription = gameStateSubject.subscribe((newState: IBlockStatesContainer) => setState(newState));

        return () => subscription.unsubscribe();
    }, [])

    return state;
}

let displayedVersion: number = 0;
window.OnGameStateChange = async (version: number): Promise<void> => {
    const { TerminalViewModel } = window;
    if (TerminalViewModel === undefined) {
        blockStates = {};
        return
    }
    if (version <= displayedVersion) return;

    const T_EPOCH = Date.now();
    try {
        let blockIds = await TerminalViewModel.GetModifiedBlockIds(displayedVersion);
        let newStates: IBlockViewModel[] = await Promise.all(blockIds.map(async (id) => await TerminalViewModel.GetBlockState(id)))
        for (let i = 0; i < blockIds.length; i++) {
            blockStates[blockIds[i]] = newStates[i];
        }
        // Just to make sure that user can't blow up the state
        gameStateSubject.next(Object.assign({}, blockStates));
    } finally {
        console.log(`Updating took ${Date.now() - T_EPOCH}ms`);
        displayedVersion = version;
    }
}

export const startCefSharp = async () => {
    console.log("We are bound");
    await CefSharp.BindObjectAsync("TerminalViewModel");
}