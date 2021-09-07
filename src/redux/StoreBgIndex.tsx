import { createStore,combineReducers  } from 'redux';
//import reducerBgColor from './ReducerBgColor';
import reducerBgIndex from './ReducerBgIndex';

// const reducer = combineReducers({
//     reducerBgColor,
//     reducerBgIndex
//   });  

const storeBgIndex = createStore(reducerBgIndex)

export default storeBgIndex;