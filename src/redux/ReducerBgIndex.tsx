
const reducerBgIndex = (state = 0 , action) => {
    console.log(action.type==="BgcolorIndex")
    // switch (action.type) {
    //   case "BgcolorIndex":
    //     return !state;
    //   default:
    //     return state;
    // }
    if(action.type==="BgcolorIndex"){
        return 1
      }else{
          return 2
      }
  };
  export default reducerBgIndex;