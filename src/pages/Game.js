import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import { getScore } from '../redux/action';
import { fetchTrivia } from '../services/fetchApi';
import '../style.component/game.css';

// import { fetchGravatar } from '../services/fetchApi';
const he = require('he');

const seconds = 1000;
class Game extends Component {
  state = {
    returnQuestions: [],
    randomPositions: [],
    returnCode: 0,
    disabled: false,
    nextButtonHidden: true,
    counter: 0,
    questionsColors: false,
    secondsTimer: 30,
  }

  async componentDidMount() {
    await this.getQuestions();
    this.randomPositions();

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        secondsTimer: prevState.secondsTimer - 1,
      }), () => {
        const { secondsTimer } = this.state;
        if (!secondsTimer) this.clearTime();
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

  validationScore = () => {
    const { returnQuestions, counter, secondsTimer } = this.state;
    const { setScore } = this.props;
    const { difficulty } = returnQuestions[counter];

    const scoreBase = 10;
    const scoreHard = 3;
    const scoreMedium = 2;

    if (difficulty === 'hard') {
      setScore(scoreBase + (secondsTimer * scoreHard));
    }
    if (difficulty === 'medium') {
      setScore(scoreBase + (secondsTimer * scoreMedium));
    }
    if (difficulty === 'easy') {
      setScore(scoreBase + secondsTimer);
    }
  }

  handleClick = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      this.validationScore();
    }
    // this.clearTime();
    this.setState({
      questionsColors: true,
      nextButtonHidden: false,
      disabled: true,
    });
  }

  nextButtonClick = () => {
    const { counter } = this.state;
    const { history } = this.props;
    const lastQuestionPosition = 4;
    if (counter === lastQuestionPosition) {
      history.push('/feedback');
    }
    this.setState((state) => ({
      nextButtonHidden: true,
      counter: state.counter + 1,
      secondsTimer: 30,
      questionsColors: false,
      disabled: false,
    }), () => this.randomPositions());
  }

  randomPositions = () => {
    const lastPosition = 3;
    const positions = [0, 1, 2, lastPosition];
    const number = 0.5;
    this.setState({
      randomPositions: positions.sort(() => Math.random() - number),
    });
  }

  render() {
    const {
      returnQuestions,
      returnCode,
      nextButtonHidden,
      counter,
      secondsTimer,
      questionsColors,
      disabled,
      randomPositions } = this.state;
    const { history } = this.props;

    const errorCode = 3;
    if (returnCode === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }

    let newArray = [];

    if (returnQuestions.length > 0) {
      newArray = [...returnQuestions[counter].incorrect_answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          className={ questionsColors ? 'wrong-answer' : '' }
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => this.handleClick() }
        >
          {he.decode(answer)}
        </button>
      )),
      (
        <button
          type="button"
          disabled={ disabled }
          className={ questionsColors ? 'correct-answer' : '' }
          data-testid="correct-answer"
          key="correct"
          onClick={ () => this.handleClick(true) }
        >
          {he.decode(returnQuestions[counter].correct_answer)}
        </button>
      ),
      ];
    }

    const randomizedAnswers = [];

    randomPositions.forEach((position) => {
      randomizedAnswers.push(newArray[position]);
    });

    return (
      <div className="main">
        <Header />
        {returnQuestions.length > 0
        && (
          <div className="questionDiv">
            <div className="timer">
              <span>{ secondsTimer }</span>
            </div>
            <div className="categoryDiv">
              <h2 data-testid="question-category">
                {returnQuestions[counter].category}
              </h2>
              <span data-testid="question-text">
                {returnQuestions.length > 0
            && he.decode(returnQuestions[counter].question)}
              </span>
            </div>
            <div
              className="answerDiv"
              data-testid="answer-options"
            >
              {randomizedAnswers}
            </div>
            <div className="nextDivButton">
              { !nextButtonHidden
              && (
                <button
                  className="nextButton"
                  type="button"
                  onClick={ () => this.nextButtonClick() }
                  data-testid="btn-next"
                >
                  Next
                </button>
              )}
            </div>
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
  setScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(getScore(score)),
});

export default connect(null, mapDispatchToProps)(Game);
