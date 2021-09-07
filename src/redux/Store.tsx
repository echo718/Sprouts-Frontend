import { createStore,combineReducers  } from 'redux';
import reducerBgColor from './ReducerBgColor';
import reducerBgIndex from './ReducerBgIndex';

const rootReducer = combineReducers({
    reducerBgColor,
    reducerBgIndex
  });

const store = createStore(rootReducer)

export default store;