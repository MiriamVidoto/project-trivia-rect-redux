import { GET_SCORE, GRAVATAR_EMAIL, PLAYER_LOGIN } from '../action/actionTypes';

const inicialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = inicialState, action) => {
  switch (action.type) {
  case PLAYER_LOGIN:
    return { ...state, name: action.name };

  case GRAVATAR_EMAIL:
    return { ...state, gravatarEmail: action.email };

  case GET_SCORE:
    return { ...state, score: state.score + action.score };

  default:
    return state;
  }
};

export default player;
