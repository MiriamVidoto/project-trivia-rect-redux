import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.component/header.css';

class Header extends Component {
  render() {
    const { hashEmail, name, score } = this.props;
    return (
      <div className="header-container">
        <div className="header-image">
          <img
            className="header-gravatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="foto"
          />
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div className="header-score">
          <p>
            Score:
            {' '}
            <span data-testid="header-score" className="headerScore">{score}</span>
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  hashEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  hashEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
