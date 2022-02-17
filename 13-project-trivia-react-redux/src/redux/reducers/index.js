import { combineReducers } from 'redux';
import player from './reducerLogin';
import token from './tokenReducer';
import reducerAvatar from './reducerAvatar';

const rootReducer = combineReducers({
  player,
  token,
  reducerAvatar,
});

export default rootReducer;
