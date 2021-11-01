import React, { useEffect, useState } from "react";
import { startCefSharp } from "./cefsharp/cefsharp";
import useDebounce from "./utils/useDebounce";
import useToggle from "./utils/useToggle";
import "./styles/styles";

const frameWindow = 60 / 1000;

const App: React.FunctionComponent = () => {
    const [stateBinded, setStateBinded] = useState(false);
    const [tEpoch] = useState<number>(Date.now());
    const [tElapsed, setTElapsed] = useState<number>(Date.now());
    const [elapsedFrames, setElapsedFrames] = useState<number>(0);
    const [rebounce, toggleRebounce] = useToggle(false);

    useEffect(() => {
        startCefSharp()
            .then(() => setStateBinded(true))
            .catch((e: Error) => {
                alert(e);
                console.log(e.stack);
            });

        toggleRebounce();
    }, [])

    useDebounce(() => {
        const elapsed = Date.now() - tEpoch;
        const nFrames = Math.trunc(tElapsed * frameWindow);
        setTElapsed(elapsed);
        setElapsedFrames(nFrames);
        toggleRebounce();
        console.log("re");
    }, frameWindow, [rebounce])

    return (
        <div className="relative w-screen h-screen font-engineer text-xl text-blueGray-700 bg-white bg-opacity-90">
            {stateBinded ? (
                <>
                    <p>Test, test.</p>
                    <p>T: {Math.trunc(tElapsed / 1000)}</p>
                    <p>F: {elapsedFrames}</p>
                </>
            ) : (
                <p>State not bound.</p>
            )}
        </div>
    )
}

export default App;