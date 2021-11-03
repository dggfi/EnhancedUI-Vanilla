import React, { useState } from "react";
import { IBlockStatesContainer } from "../cefsharp/cefsharp";
import BlockListItem from "./BlockListItem";
import ControlPanelZoneFrame from "./ControlPanelZoneFrame";

interface IBlocksZoneProps {
    state: IBlockStatesContainer
}

const ControlPanelBlocksZone: React.FC<IBlocksZoneProps> = (props) => {
    // The principal selection will always be the first item in the set
    const [selected, setSelected] = useState<Set<number>>(() => new Set([]));

    return (
        <ControlPanelZoneFrame>
            <p>Blocks Zone</p>
            <ul className="py-1">
                {Object.keys(props.state).map((blockId: any) => (
                    <li key={blockId} className="contents">
                        <BlockListItem selected={selected} setSelected={setSelected} block={props.state[blockId]} />
                    </li>
                ))}
            </ul>
        </ControlPanelZoneFrame>
    )
}

export default ControlPanelBlocksZone;