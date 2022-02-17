import React from 'react';
import PropTypes from 'prop-types';

import '../pages/css/game.css';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      countdown: 30,
    };
  }

  componentDidMount() {
    this.renderCounter();
  }

  // ciclo de vida do react, onde pego a callback (countTimer) passada do pai.
  shouldComponentUpdate(_, nextState) {
    const { countdown } = this.state;
    if (countdown !== nextState.countdown) {
      const { countTimer } = this.props;
      countTimer(countdown);
      return true;
    } return false;
  }

  renderCounter = () => {
    const ONE_SECOND = 1000;
    this.timer = setInterval(this.setCounter, ONE_SECOND);
  }

  setCounter = () => {
    const { countdown } = this.state;
    const { changeValidation } = this.props;
    if (countdown <= 0) {
      this.setState({ countdown: 0 });
      clearInterval(this.timer);
      changeValidation();
    } else {
      this.setState((state) => ({ countdown: state.countdown - 1 }));
    }
  }

  render() {
    const { countdown } = this.state;

    return (
      <h2 className="timer">
        { 'Time Left: ' }
        {countdown}
      </h2>
    );
  }
}

Timer.propTypes = {
  changeValidation: PropTypes.func,
}.isRequired;

export default Timer;
