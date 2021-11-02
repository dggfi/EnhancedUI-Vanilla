declare global {
    interface Window {
        CefSharp: any,
        OnGameStateChange(version: number): Promise<void>
        TerminalViewModel: ITerminalViewModel
    }
}

export interface ITerminalViewModel {
    GetInteractedBlockId(): number,
    // Get state
    GetBlockIds(): Promise<number[]>,
    GetModifiedBlockIds(sinceVersion: number): Promise<number[]>,
    GetBlockState?(blockId: number): Promise<IBlockViewModel>,
    // Set properties
    SetBlockName(blockId: number, name: string): Promise<void>,
    SetBlockCustomData(blockId: number, SetBlockCustomData: string): Promise<void>,
    SetBlockProperty(blockId: number, propertyId: string, object?: any): Promise<void>,
    // Groups
    // GetGroups(): Promise<{ [key: string]: number[] }>,
    // AddBlockToGroup(blockId: number, groupName: string): Promise<void>,
    // RemoveBlockFromGroup(blockId: number, groupName: string): Promise<void>
}

export interface IBlockViewModel {
    readonly Id: number,
    // GetHashCode requires an invocation
    // readonly GetHashCode: number,
    readonly Version: number,
    readonly Properties: { [key: string]: IPropertyModelView },
    readonly isValid: boolean,
    readonly isFunctional: boolean,
    readonly Name: string,
    readonly CustomData: string,
    readonly DetailedInfo: string,
    readonly ClassName: string,
    readonly TypeId: string,
    readonly SubtypeName: string,
    readonly Position: number[],
    readonly Size: number[],
}

export interface IPropertyModelView {
    readonly Value?: boolean | number | Function | IColor | unknown,
    readonly Id: string,
    readonly TypeName: string,
    // Same as with IBlockViewModel
    // readonly GetHashCode: number
}

export interface IStringBuilder {}
export interface IColor {}