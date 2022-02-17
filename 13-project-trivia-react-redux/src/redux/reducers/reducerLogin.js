import { SCORE_ASSERTIONS, USER } from '../actions/index';

const INITIAL_STATE_FIELDS = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const reducerLogin = (state = INITIAL_STATE_FIELDS, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.name,
      assertions: action.assertions,
      score: action.score,
      gravatarEmail: action.gravatarEmail,
    };
  case SCORE_ASSERTIONS:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default reducerLogin;
