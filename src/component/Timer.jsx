import React, { Component } from 'react';
import propTypes from 'prop-types';

const seconds = 1000;

export default class Timer extends Component {
  state = {
    secondsTimer: 30,
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        secondsTimer: prevState.secondsTimer - 1,
      }), () => {
        const { secondsTimer } = this.state;
        if (!secondsTimer) return this.clearTime();
      });
    }, seconds);
  }

  clearTime = () => {
    const { btnDisabled } = this.props;
    clearInterval(this.timer);
    btnDisabled();
  }

  render() {
    const { secondsTimer } = this.state;

    return (
      <div>
        <h1>
          {secondsTimer}
        </h1>
      </div>
    );
  }
}

Timer.propTypes = {
  btnDisabled: propTypes.func.isRequired,
};
