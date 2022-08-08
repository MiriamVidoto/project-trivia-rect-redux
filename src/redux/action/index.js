import { PLAYER_LOGIN, GRAVATAR_EMAIL } from './actionTypes';

export const playerLogin = (name) => ({
  type: PLAYER_LOGIN,
  name,
});

export const gravatarAction = (email) => ({
  type: GRAVATAR_EMAIL,
  email,
});
