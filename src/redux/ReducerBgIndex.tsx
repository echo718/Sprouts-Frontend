
const reducerBgIndex = (state = true, action) => {
    switch (action.type) {
        case "BgcolorIndexT":
            return !action.payload
        case "BgcolorIndexF":
            return !action.payload
        default:
            return state

    }

};
export default reducerBgIndex;