import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  handleClickSubmit = (event) => {
    const { loginStore } = this.props;
    const { email } = this.state;

    loginStore(email);
    event.preventDefault();
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
  loginStore: PropTypes.func.isRequired,
};

export default Login;