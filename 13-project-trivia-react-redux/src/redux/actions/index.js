export const USER = 'USER';
export const TOKEN = 'TOKEN';
export const UNIQUE_TOKEN = 'UNIQUE_TOKEN';
export const AVATAR = 'AVATAR';
export const SCORE_ASSERTIONS = 'SCORE_ASSERTIONS';

export const createUser = (name, assertions, score, gravatarEmail) => ({
  type: USER,
  name,
  assertions,
  score,
  gravatarEmail,
});

export const createScore = (score, assertions) => ({
  type: SCORE_ASSERTIONS,
  score,
  assertions,
});

export const createToken = (token) => ({
  type: TOKEN,
  token,
});

export const createAvatar = (imgAvatar) => ({
  type: AVATAR,
  imgAvatar,
});
