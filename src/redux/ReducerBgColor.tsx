
const reducerBgColor = (state = 'transparent', action) => { 
    switch (action.type) {
      
      case "change to CCFF33":
        //return '#CCFF33';
        return action.payload
      case "change to FF0088":
       // return '#FF0088';
       return action.payload
      default:
        return state;
    }
  };
  export default reducerBgColor;