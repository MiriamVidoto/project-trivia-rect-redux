import { GET_SCORE, GRAVATAR_EMAIL, PLAYER_LOGIN } from './actionTypes';

export const playerLogin = (name) => ({
  type: PLAYER_LOGIN,
  name,
});

export const gravatarAction = (email) => ({
  type: GRAVATAR_EMAIL,
  email,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});
