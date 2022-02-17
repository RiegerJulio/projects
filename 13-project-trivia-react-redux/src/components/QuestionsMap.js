import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decode } from 'he';
import Timer from './Timer';
import { createScore } from '../redux/actions/index';

import '../pages/css/login-page.css';

class QuestionsMap extends Component {
  constructor() {
    super();

    this.state = {
      responses: [],
      correctResponse: '',
      validation: false,
      colorClassName: false,
      nextQuestion: false,
      timer: 30,
    };
  }

  componentDidMount() {
    this.pushAnswers();
  }

  randomQuestions = (pullQuestions) => {
    const MAGIC_NUMBER = 0.5;
    const randomArray = pullQuestions.sort(() => (Math.random() - MAGIC_NUMBER)); // sort embaralhar as respostas
    return randomArray;
  }

  pushAnswers = () => {
    const { question } = this.props;
    console.log(question);
    const pullQuestions = [...question.incorrect_answers, question.correct_answer];
    this.setState({
      responses: this.randomQuestions(pullQuestions),
      correctResponse: question.correct_answer,
    });
  }

  changeValidation = () => {
    this.setState({
      validation: true,
      nextQuestion: true,
    });
  }

  handleClick = () => {
    this.setState({
      colorClassName: true,
      nextQuestion: true,
    });
  }

  clickNextQuestion = async () => {
    const { updateIndexQuestion,
      indexQuestion, history, imgAvatar, namePlayer, score } = this.props;
    const teste = JSON.parse(localStorage.getItem('ranking')) || [];
    const localStorageInfoRank = [...teste,
      { picture: imgAvatar, name: namePlayer, score }];
    const INDEX_NUMBER = 4;
    if (indexQuestion === INDEX_NUMBER) {
      localStorage.setItem('ranking', JSON.stringify(localStorageInfoRank));
      history.push('/feedback');
    } else {
      await updateIndexQuestion();
      this.setState({
        colorClassName: false,
        validation: false,
      });
      this.pushAnswers();
    }
  }

  countTimer = (timer) => {
    this.setState({
      timer,
    });
  }

  handlePoints = () => {
    const { question, dispatchScore } = this.props;
    const { timer } = this.state;
    const localStoragePlayerInfo = JSON.parse(localStorage.getItem('playerInfo'));
    const { player: { score = 0, assertions } } = localStoragePlayerInfo;
    const ONE_POINT = 1;
    const TWO_POINTS = 2;
    const THREE_POINTS = 3;
    const TEN_POINTS = 10;

    switch (question.difficulty) {
    case question.difficulty === 'hard':
      localStoragePlayerInfo.player.score = score + TEN_POINTS
      + (timer * THREE_POINTS);
      localStoragePlayerInfo.player.assertions = assertions + 1;
      dispatchScore(localStoragePlayerInfo.player.score,
        localStoragePlayerInfo.player.assertions);
      localStorage.setItem('playerInfo', JSON.stringify(localStoragePlayerInfo));
      break;
    case question.difficulty === 'medium':
      localStoragePlayerInfo.player.score = score + TEN_POINTS + (timer * TWO_POINTS);
      localStoragePlayerInfo.player.assertions = assertions + 1;
      dispatchScore(localStoragePlayerInfo.player.score,
        localStoragePlayerInfo.player.assertions);
      localStorage.setItem('playerInfo', JSON.stringify(localStoragePlayerInfo));
      break;
    default:
      localStoragePlayerInfo.player.score = score + TEN_POINTS + (timer * ONE_POINT);
      localStoragePlayerInfo.player.assertions = assertions + 1;
      dispatchScore(localStoragePlayerInfo.player.score,
        localStoragePlayerInfo.player.assertions);
      localStorage.setItem('playerInfo', JSON.stringify(localStoragePlayerInfo));
      break;
    }
  }

  render() {
    const { question, indexQuestion } = this.props;
    const { responses, correctResponse, validation, colorClassName,
      nextQuestion, timer } = this.state;
    return (
      <div>
        <p>
          { !colorClassName ? (
            <Timer
              changeValidation={ this.changeValidation }
              countTimer={ this.countTimer }
            />
          ) : (
            <div>
              <h2 className="timer">
                {'Time Left: '}
                {timer}
              </h2>
            </div>
          )}
        </p>
        <h3 data-testid="question-category" className="question-text">
          { 'Category: '}
          { decode(question.category)}
        </h3>
        <h3 data-testid="question-text" className="question-text">
          { decode(question.question)}
        </h3>
        <div data-testid="answer-options" className="answer-container">
          {responses.map((response, index) => (
            response === correctResponse ? (
              <button
                type="button"
                data-testid="correct-answer"
                key={ response }
                disabled={ validation }
                id="btn"
                className={
                  colorClassName === false ? 'btn waves-effect waves-light blue darken-1'
                    : 'btn waves-effect waves-light light-green darken-1'
                }
                onClick={ () => {
                  this.handleClick();
                  if (response === correctResponse) {
                    this.handlePoints();
                  }
                } }
              >
                { decode(response) }
              </button>
            ) : (
              <button
                type="button"
                data-testid={ `wrong-answer-${index}` }
                key={ response }
                disabled={ validation }
                className={
                  colorClassName === false
                    ? 'btn waves-effect waves-light light-blue darken-1'
                    : 'btn waves-effect waves-light red darken-1'
                }
                onClick={ this.handleClick }
              >
                { decode(response) }
              </button>
            )
          ))}
        </div>
        <div className="next-btn">
          { nextQuestion
            && (
              <button
                type="button"
                id="button-next"
                data-testid="btn-next"
                question={ question[indexQuestion] }
                onClick={ this.clickNextQuestion }
                className="btn waves-effect waves-light light-blue btn-next"
              >
                Next
              </button>) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgAvatar: state.reducerAvatar,
  namePlayer: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score, assertions) => dispatch(createScore(score, assertions)),
});

QuestionsMap.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
    difficulty: PropTypes.string,
  }),
  indexQuestion: PropTypes.number,
  updateIndexQuestion: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsMap);
