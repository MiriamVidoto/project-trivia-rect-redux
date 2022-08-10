import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {
            ranking.map(({ name, score, hashEmail }, index) => (
              <li key={ index }>
                <h2
                  data-testid={ `player-name-${index}` }
                >
                  { name}
                </h2>
                <h2 data-testid={ `player-score-${index}` }>
                  { score}
                </h2>
                <img
                  className="header-gravatar"
                  data-testid="header-profile-picture"
                  src={ `https://www.gravatar.com/avatar/${hashEmail}` }
                  alt="foto"
                />
              </li>
            ))
          }
        </ul>
        <button
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
