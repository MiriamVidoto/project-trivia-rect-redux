import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.component/header.css';

// import { fetchGravatar } from '../services/fetchApi';

class Header extends Component {
  render() {
    const { hashEmail, name } = this.props;
    return (
      <div className="header-container">
        <div className="header-image">
          <img
            className="header-gravatar"
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="foto"
          />
          {/* <span>Valmir chagas</span> */}
          <span data-testid="header-player-name">{ name }</span>
        </div>
        <div className="header-score">
          <span data-testid="header-score">Score: 0</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  hashEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  hashEmail: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Header);
