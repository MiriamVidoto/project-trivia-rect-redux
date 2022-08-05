import PLAYER_LOGIN from '../action/actionTypes';

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

  default:
    return state;
  }
};

export default player;
