// @ts-nocheck

console.log(`The current time is: ${Date.now()}`);

let blockStates = null;
const stateUpdated = async () => {
    console.log("Test");

    blockStates = await state.GetBlockStates();
    for (const entityId in blockStates) {
        console.log(entityId)
    }
}