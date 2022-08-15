import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gravatarAction, playerLogin } from '../redux/action';
import { fetchToken } from '../services/fetchApi';
import '../style.component/login.css';
import Logo from '../trivia.png';

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
    const { gravatar, usernformation } = this.props;
    const { email, name } = this.state;
    event.preventDefault();
    const { history } = this.props;
    const returnToken = await fetchToken();
    localStorage.setItem('token', returnToken);

    const hashEmail = md5(email).toString();
    gravatar(hashEmail);

    usernformation(name);

    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div className="login">
          <img src={ Logo } alt="Trivia" />
          <form className="login-form">
            <label htmlFor="email">
              <input
                className="input-user"
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
                className="input-user"
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
              className="button-play"
              type="submit"
              data-testid="btn-play"
              disabled={ this.validationEmail(name, email) }
              onClick={ (event) => this.handleClickSubmit(event) }
            >
              Play
            </button>
            <button
              className="button-settings"
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Configurações
            </button>
          </form>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  usernformation: PropTypes.func.isRequired,
  gravatar: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  usernformation: (name) => dispatch(playerLogin(name)),
  gravatar: (email) => dispatch(gravatarAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
