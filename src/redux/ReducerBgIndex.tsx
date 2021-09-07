
const reducerBgIndex = (state = true , action) => {
    switch (action.type) {
      case "BgcolorIndex":
        return !state;
      default:
        return !state;
    }
  };
  export default reducerBgIndex;