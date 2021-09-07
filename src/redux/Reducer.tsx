const reducerBgColor = (state = 'transparent', action) => {
    switch (action.type) {
      case "change to CCFF33":
        return '#CCFF33';
      case "change to FF0088":
        return '#FF0088';
      default:
        return 'transparent';
    }
  };
  export default reducerBgColor;