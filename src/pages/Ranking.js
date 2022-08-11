import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.component/ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    getRanking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: getRanking,
    });
  }

  home = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="mainRanking">
        <div className="rankingDiv">
          <span data-testid="ranking-title">Ranking</span>
        </div>
        <ul>
          {
            ranking.map(({ name, score, hashEmail }, index) => (
              <li key={ index }>
                <img
                  className="header-gravatar"
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${hashEmail}` }
                  alt="foto"
                />
                <span
                  className="nameRanking"
                  data-testid={ `player-name-${index}` }
                >
                  { name}
                </span>
                <span
                  className="scoreRanking"
                  data-testid={ `player-score-${index}` }
                >
                  { score}
                </span>
              </li>
            ))
          }
        </ul>
        <button
          className="homeButton"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.home }
        >
          Voltar página inicial
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
