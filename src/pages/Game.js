import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../component/Header';
import Timer from '../component/Timer';
import { fetchTrivia } from '../services/fetchApi';
import '../style.component/game.css';

// import { fetchGravatar } from '../services/fetchApi';
class Game extends Component {
  state = {
    returnQuestions: [],
    returnCode: 0,
    disabled: false,
    nextButtonHidden: true,
    counter: 0,
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
  //   if (question === returnQuestions[counter].correct_answer) return 'correct-answer';
  //   return `wrong-answer-${!index ? 0 : index - 1}`;
  // }

  // questionsColors = (question) => {
  //   const { returnQuestions } = this.props;
  //   if (question === returnQuestions[counter].correct_answer) return 'correct-answer';
  //   return 'wrong-answer';
  // }

  btnDisabled = () => {
    this.setState((prevState) => ({
      disabled: !prevState.prevState,
    }));
  }

  showNextButton = () => {
    this.setState({
      nextButtonHidden: false,
    });
  }

  nextButtonClick = () => {
    this.setState((state) => ({
      nextButtonHidden: true,
      counter: state.counter + 1,
    }));
  }

  render() {
    const {
      returnQuestions,
      returnCode,
      disabled,
      nextButtonHidden,
      counter } = this.state;
    const { history } = this.props;

    let newArray = [];

    if (returnQuestions.length > 0) {
      newArray = [...returnQuestions[counter].incorrect_answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          disabled={ disabled }
          className="wrong-answer"
          data-testid={ `wrong-answer-${index}` }
          onClick={ () => this.showNextButton() }
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
          onClick={ () => this.showNextButton() }
        >
          {returnQuestions[counter].correct_answer}
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
            <h2 data-testid="question-category">{returnQuestions[counter].category}</h2>
            <h2 data-testid="question-text">
              {returnQuestions.length > 0
          && returnQuestions[counter].question}
            </h2>
            <Timer
              btnDisabled={ () => this.btnDisabled() }
            />
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
  // secondsTime: PropTypes.func.isRequired,
};

export default Game;
