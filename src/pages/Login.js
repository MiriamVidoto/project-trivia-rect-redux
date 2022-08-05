import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchToken } from '../services/fetchApi';

class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  validationEmail = (name, email) => {
    if (name.length === 0 || email.length === 0) {
      return true;
    }
  }

  handleClickSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const returnToken = await fetchToken();
    localStorage.setItem('token', returnToken);

    history.push('/game');
  };
  
  render() {
    const { name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              data-testid="input-gravatar-email"
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              value={ name }
              data-testid="input-player-name"
              placeholder="Digite seu nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ this.validationEmail(name, email) }
            onClick={ this.handleClickSubmit }
          >
            Play
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
