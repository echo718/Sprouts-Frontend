import { createStore,combineReducers  } from 'redux';
import reducerBgColor from './ReducerBgColor';
import reducerBgIndex from './ReducerBgIndex';

const reducer = combineReducers({
    reducerBgColor,
    reducerBgIndex
  });  

const store = createStore(reducer)



export default store;