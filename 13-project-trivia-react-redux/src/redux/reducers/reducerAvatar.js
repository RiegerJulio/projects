import { AVATAR } from '../actions/index';

const IMG_AVATAR = '';

const reducerAvatar = (state = IMG_AVATAR, action) => {
  switch (action.type) {
  case AVATAR:
    return action.imgAvatar;
  default:
    return state;
  }
};

export default reducerAvatar;
