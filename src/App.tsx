// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./styles/styles";

const App: React.FunctionComponent = () => {
    const [stateBinded, setStateBinded] = useState(false);

    useEffect(() => {
        const onStart = async () => {
            await CefSharp.BindObjectAsync("state");
            state.NotifyBound();
        }

        onStart()
            .then(() => setStateBinded(true))
            .catch((e: Error) => {
                alert(e);
                console.log(e.stack);
            });
        
    }, [])

    return (
        <div className="relative w-screen h-screen font-engineer text-xl text-blueGray-700 bg-white bg-opacity-90 select-none">
            {stateBinded ? (
                <p>Test, test.</p>
            ) : (
                <p>State not bound.</p>   
            )}
        </div>
    )
}

export default App;