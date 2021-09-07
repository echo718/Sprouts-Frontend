
const initialState = 'transparent'

const reducerBgColor = (state = initialState, action) => {
  console.log(action.type==="change to CCFF33")
  if(action.type==="change to CCFF33"){
    return 'red'
  }
  else if (action.type==="change to FF0088"){
    return 'blue'
  }
  else {
    return 'yellow'
  }
  
 
    // switch (action.type) {
      
    //   case "change to CCFF33":
    //     //return '#CCFF33';
    //     return 'red'
    //   case "change to FF0088":
    //    // return '#FF0088';
    //    return 'blue'
    //   default:
    //     return state;
    // }
  };
  export default reducerBgColor;