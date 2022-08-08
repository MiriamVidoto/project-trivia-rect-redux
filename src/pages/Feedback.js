import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const feedbackCondition = 3;
    const result = assertions < feedbackCondition ? 'Could be better...' : 'Well Done!';

    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{ result }</h3>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
