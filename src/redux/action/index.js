import PLAYER_LOGIN from './actionTypes';

const playerLogin = (name) => ({
  type: PLAYER_LOGIN,
  name,
});

export default playerLogin;
