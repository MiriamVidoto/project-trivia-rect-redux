import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import { fetchTrivia } from '../services/fetchApi';
import '../style.component/game.css';
import Timer from '../component/Timer';

// import { fetchGravatar } from '../services/fetchApi';
class Game extends Component {
  state = {
    returnQuestions: [],
    returnCode: 0,
    disabled: false,
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

  // questionsChecked = (question, index) => {
  //   const { returnQuestions } = this.props;
  //   if (question === returnQuestions[0].correct_answer) return 'correct-answer';
  //   return `wrong-answer-${!index ? 0 : index - 1}`;
  // }

  // questionsColors = (question) => {
  //   const { returnQuestions } = this.props;
  //   if (question === returnQuestions[0].correct_answer) return 'correct-answer';
  //   return 'wrong-answer';
  // }

  btnDisabled = () => {
    this.setState((prevState) => ({
      disabled: !prevState.prevState,
    }));
  }

  render() {
    const { returnQuestions, returnCode, disabled } = this.state;
    const { history } = this.props;

    let newArray = [];

    if (returnQuestions.length > 0) {
      newArray = [...returnQuestions[0].incorrect_answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          className="wrong-answer"
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => {} }
        >
          {answer}
        </button>
      )),
      (
        <button
          type="button"
          disabled={ disabled }
          className="correct-answer"
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
            <Timer
              btnDisabled={ () => this.btnDisabled() }
            />
            <div
              data-testid="answer-options"
            >
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
  // secondsTime: PropTypes.func.isRequired,
};

export default Game;
