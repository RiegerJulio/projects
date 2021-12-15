import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (
      <div className="full-card">
        <div className="top-side">
          <img src={ cardImage } alt={ cardName } data-testid="image-card" id="img" />
        </div>
        <div className="mid-side">
          { cardTrunfo
          && <span className="rarity" data-testid="trunfo-card"> Super Trunfo / </span> }
          <span className="rarity" data-testid="rare-card">{ cardRare }</span>
          <h2 className="card-name" data-testid="name-card">{ cardName }</h2>
          <p data-testid="description-card">{ cardDescription }</p>
        </div>
        <div className="bot-side">
          <div className="attr" data-testid="attr1-card">
            <div className="value">{ cardAttr1 }</div>
            <div className="type">Força Mental</div>
          </div>
          <div className="attr" id="border" data-testid="attr2-card">
            <div className="value">{ cardAttr2 }</div>
            <div className="type">Inteligência</div>
          </div>
          <div className="attr" data-testid="attr3-card">
            <div className="value">{ cardAttr3 }</div>
            <div className="type">Cringe</div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
