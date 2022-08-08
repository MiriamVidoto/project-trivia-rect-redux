import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import { fetchTrivia } from '../services/fetchApi';

// import { fetchGravatar } from '../services/fetchApi';
class Game extends Component {
  state = {
    returnQuestions: [],
    returnCode: 0,
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const returnLocalStorage = localStorage.getItem('token');
    const returnQuestions = await fetchTrivia(returnLocalStorage);
    this.setState({
      returnQuestions: returnQuestions.results,
      returnCode: returnQuestions.response_code,
    });
  }

  render() {
    const { returnQuestions, returnCode } = this.state;
    const { history } = this.props;
    let newArray = [];

    if (returnQuestions.length > 0) {
      newArray = [...returnQuestions[0].incorrect_answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => {} }
        >
          {answer}
        </button>
      )),
      (
        <button
          type="button"
          data-testid="correct-answer"
          key="correct"
          onClick={ () => {} }
        >
          {returnQuestions[0].correct_answer}
        </button>
      ),
      ];
      const number = 0.5;
      newArray = newArray.sort(() => Math.random() - number);
    }

    const errorCode = 3;
    if (returnCode === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }

    return (
      <div>
        <Header />
        {returnQuestions.length > 0
        && (
          <div>
            <h2 data-testid="question-category">{returnQuestions[0].category}</h2>
            <h2 data-testid="question-text">
              {returnQuestions.length > 0
          && returnQuestions[0].question}
            </h2>
            <div data-testid="answer-options">
              {newArray}
            </div>
          </div>)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
