import React from "react";
import { IBlockViewModel } from "../../types";

interface IBlockListItemProps {
    selected: Set<number>,
    setSelected: Function,
    block: IBlockViewModel
}

const BlockListItem: React.FC<IBlockListItemProps> = (props) => {
    const selected = props.selected.has(props.block.Id)
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (selected) {
            let newSelected = new Set([...props.selected]);
            newSelected.delete(props.block.Id);
            props.setSelected(newSelected);
        } else {
            let newSelected = new Set([...props.selected]);
            newSelected.add(props.block.Id);
            props.setSelected(newSelected)
        }
    }

    return (
        <div
            onClick={onClickHandler}
            className={"w-full pl-6 py-1 text-2xl hover:text-blueGray-600 hover:bg-blueGray-100 " + (selected && "text-blueGray-800 bg-blueGray-200 hover:bg-blueGray-300")}
        >
            <p>{props.block.Name}</p>    
        </div>
    )
}

export default React.memo(BlockListItem);