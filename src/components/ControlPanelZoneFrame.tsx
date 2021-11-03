import React from "react";

const ControlPanelZoneFrame: React.FC = (props) => {
    return (
        <div className="w-1/3 p-8">
            {props.children}
        </div>
    )
}

export default ControlPanelZoneFrame;