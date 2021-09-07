const reducerBgColor = (state = 'transparent', action) => {
    switch (action.type) {
      case "change to CCFF33":
        //return '#CCFF33';
        return 'red'
      case "change to FF0088":
       // return '#FF0088';
       return 'blue'
      default:
        return 'transparent';
    }
  };
  export default reducerBgColor;