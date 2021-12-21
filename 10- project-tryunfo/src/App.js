import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

const cardState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  isSaveButtonDisabled: true,
};
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...cardState,
      hasTrunfo: false,
      savedCard: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.checkResults());
  }

  checkText = () => {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    if (cardName !== ''
      && cardDescription !== ''
      && cardImage !== ''
      && cardRare !== '') {
      return true;
    } return false;
  }

  checkNum = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const att1 = Number(cardAttr1);
    const att2 = Number(cardAttr2);
    const att3 = Number(cardAttr3);
    const sum = 210;
    const num = 90;
    if (att1 + att2 + att3 <= sum
      && att1 <= num
      && att1 >= 0
      && att2 <= num
      && att2 >= 0
      && att3 <= num
      && att3 >= 0
    ) {
      return true;
    } return false;
  }

  checkResults = () => {
    const textCheck = this.checkText();
    const numCheck = this.checkNum();

    if (textCheck && numCheck === true) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { savedCard, hasTrunfo, ...saved } = this.state;
    this.setState((storage) => ({
      savedCard: [...storage.savedCard, saved],
      hasTrunfo: saved.cardTrunfo === true ? true : hasTrunfo,
      ...cardState,
    }));
  }

  removeButton = (card, trunfoCard) => {
    const { savedCard } = this.state;
    this.setState((storage) => ({
      savedCard: savedCard.filter((name) => name.cardName !== card),
      hasTrunfo: trunfoCard === true ? false : storage.hasTrunfo,
    }));
  }

  render() {
    const { savedCard } = this.state;
    return (
      <div>
        <h1>Super Trunfo Gradivinhos Edition</h1>
        <div className="container">
          <div className="form">
            <Form
              { ...this.state }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="preview">
            <Card { ...this.state } />
          </div>
          <div className="cards">
            {
              savedCard.map((cards) => (
                <div key={ cards.cardName }>
                  <Card { ...cards } />
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-testid="delete-button"
                    onClick={ () => this.removeButton(cards.cardName, cards.cardTrunfo) }
                  >
                    Excluir
                  </button>
                </div>
              ))

            }
          </div>
        </div>
        <h1>Julio Rieger, T17</h1>
      </div>
    );
  }
}

export default App;
