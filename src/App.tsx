import React, { useEffect, useState } from "react";
import { startCefSharp, useGameState } from "./cefsharp/cefsharp";
import useDebounce from "./hooks/useDebounce";
import useToggle from "./hooks/useToggle";
import "./styles/styles";
import { IBlockViewModel } from "../types";
import useRebounce from "./hooks/useRebounce";

const frameWindow = 60 / 1000;

const App: React.FunctionComponent = () => {
    const [stateBinded, setStateBinded] = useState(false);
    const [tEpoch] = useState<number>(Date.now());
    const [tElapsed, setTElapsed] = useState<number>(Date.now());
    const [elapsedFrames, setElapsedFrames] = useState<number>(0);

    useEffect(() => {
        startCefSharp()
            .then(() => { 
                setStateBinded(true);
            })
            .catch((e: Error) => {
                alert(e);
                console.log(e.stack);
            });
    }, [])

    useRebounce(() => {
        const elapsed = Date.now() - tEpoch;
        const nFrames = Math.trunc(tElapsed * frameWindow);
        setTElapsed(elapsed);
        setElapsedFrames(nFrames);
    }, 1000, [], true)

    // Oh boy
    const gameState = useGameState();

    return (
        <div className="relative w-screen h-screen font-engineer text-3xl text-blueGray-700 bg-white bg-opacity-90">
            {stateBinded ? (
                <>
                    <p>Test, test.</p>
                    <p>T: {Math.trunc(tElapsed / 1000)}</p>
                    <p>F: {elapsedFrames}</p>
                    <p>Oi</p>
                    <ul>
                        {Object.entries(gameState).map((entry) => {
                            let block: IBlockViewModel = entry[1];
                            return (
                                <li key={entry[0]}>
                                    <p>IDe: {block.Id}</p>
                                    <p>Custom Name: {block.Name}</p>
                                    <p>Status: {block.Size}</p>
                                </li>
                            )
                        })}
                    </ul>
                </>
            ) : (
                <p>State not bound.</p>
            )}
        </div>
    )
}

export default App;