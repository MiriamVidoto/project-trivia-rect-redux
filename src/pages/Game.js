import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../component/Header';
import { fetchTrivia } from '../services/fetchApi';
import '../style.component/game.css';

// import { fetchGravatar } from '../services/fetchApi';

const seconds = 1000;
class Game extends Component {
  state = {
    returnQuestions: [],
    newArray: [],
    returnCode: 0,
    disabled: false,
    nextButtonHidden: true,
    counter: 0,
    questionsColors: false,
    secondsTimer: 10,

  }

  async componentDidMount() {
    await this.getQuestions();
    this.randommAnswers();

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        secondsTimer: prevState.secondsTimer - 1,
      }), () => {
        const { secondsTimer } = this.state;
        if (!secondsTimer) return this.clearTime();
      });
    }, seconds);
  }

  btnDisabled = () => {
    this.setState((prevState) => ({
      disabled: !prevState.prevState,
    }));
  }

  clearTime = () => {
    clearInterval(this.timer);
    this.btnDisabled();
    this.setState({
      disabled: true,
    });
  }

  getQuestions = async () => {
    const returnLocalStorage = localStorage.getItem('token');
    const returnQuestions = await fetchTrivia(returnLocalStorage);
    this.setState({
      returnQuestions: returnQuestions.results,
      returnCode: returnQuestions.response_code,
    });
  }

  // validationScore = () => {
  //   const { difficulty } = returnQuestions[counter];

  //   const scoreBase = 10;
  //   const scoreHard = 3;
  //   const scoreMedium = 2;

  //   if (difficulty === 'hard') {
  //     return scoreBase + (timer * scoreHard);
  //   }
  //   if (difficulty === 'medium') {
  //     return scoreBase + (timer * scoreMedium);
  //   }
  //   if (difficulty === 'easy') {
  //     return scoreBase + timer;
  //   }
  // }

  handleClick = () => {
    // this.validationScore();
    this.setState({
      questionsColors: true,
      nextButtonHidden: false,
    });
  }

    nextButtonClick = () => {
      this.setState((state) => ({
        nextButtonHidden: true,
        counter: state.counter + 1,
      }));
    }

  randommAnswers = () => {
    const { counter, questionsColors, returnQuestions, disabled } = this.state;
    let newArray = [...returnQuestions[counter].incorrect_answers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        disabled={ disabled }
        className={ questionsColors ? 'wrong-answer' : '' }
        data-testid={ `wrong-answer-${index}` }
        onClick={ () => this.handleClick() }
      >
        {answer}
      </button>
    )),
    (
      <button
        type="button"
        disabled={ disabled }
        className={ questionsColors ? 'correct-answer' : '' }
        data-testid="correct-answer"
        key="correct"
        onClick={ () => this.handleClick() }
      >
        {returnQuestions[counter].correct_answer}
      </button>
    ),
    ];
    const number = 0.5;
    newArray = newArray.sort(() => Math.random() - number);
    this.setState({
      newArray,
    });
  }

  render() {
    const {
      returnQuestions,
      returnCode,
      nextButtonHidden,
      counter, secondsTimer, newArray } = this.state;
    const { history } = this.props;

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
            <h2 data-testid="question-category">{returnQuestions[counter].category}</h2>
            <h2 data-testid="question-text">
              {returnQuestions.length > 0
          && returnQuestions[counter].question}
            </h2>
            <h2>
              { secondsTimer }
            </h2>
            <div
              data-testid="answer-options"
            >
              {newArray}
            </div>
            { !nextButtonHidden
            && (
              <button
                type="button"
                onClick={ () => this.nextButtonClick() }
                data-testid="btn-next"
              >
                Next
              </button>
            )}
          </div>
        )}
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
