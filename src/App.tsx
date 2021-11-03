import React, { useEffect, useState } from "react";
import { startCefSharp, useGameState } from "./cefsharp/cefsharp";
import ControlPanelBlocksZone from "./components/ControlPanelBlocksZone";
import ControlPanelOwnershipZone from "./components/ControlPanelOwnershipZone";
import ControlPanelPropertiesZone from "./components/ControlPanelPropertiesZone";
import "./styles/styles";

const App: React.FunctionComponent = () => {
    const [stateAvailable, setStateAvailable] = useState(false);

    useEffect(() => {
        startCefSharp()
            .then(() => { 
                setStateAvailable(true);
            })
            .catch((e: Error) => {
                alert(e);
                console.log(e.stack);
            });
    }, [])

    // Creates RxJS subscription, side effect causes re-renders often
    const gameState = useGameState();

    return (
        <div className="relative w-screen h-screen font-engineer text-2xl text-blueGray-700 bg-white bg-opacity-90 rounded-lg">
            {stateAvailable && (
                <div className="flex">
                    <ControlPanelBlocksZone state={gameState} />
                    <ControlPanelPropertiesZone />
                    <ControlPanelOwnershipZone />                
                </div>
            )}
        </div>
    )
}

export default App;