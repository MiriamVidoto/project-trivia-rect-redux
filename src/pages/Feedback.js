import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends Component {
  componentDidMount() {
    const { name, hashEmail, score } = this.props;
    const ranking = {
      name,
      hashEmail,
      score,
    };
    const newRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    newRanking.push(ranking);
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const { assertions, score, history } = this.props;
    const feedbackCondition = 3;
    const result = assertions < feedbackCondition ? 'Could be better...' : 'Well Done!';

    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ result }</h3>
        <h3><span data-testid="feedback-total-score">{ score }</span></h3>
        <h3><span data-testid="feedback-total-question">{ assertions }</span></h3>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
  hashEmail: store.player.gravatarEmail,
  name: store.player.name,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  hashEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
