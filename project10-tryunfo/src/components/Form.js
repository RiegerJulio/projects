import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends React.Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <div className="form-container">
        <form onSaveButtonClick={ onSaveButtonClick } className="row g-3">
          <Input
            label="Image"
            type="text"
            id="img"
            name="cardImage"
            value={ cardImage }
            onInputChange={ onInputChange }
            test="image-input"
          />
          <Input
            label="Name"
            type="text"
            id="name"
            name="cardName"
            value={ cardName }
            onInputChange={ onInputChange }
            test="name-input"
          />
          <Input
            label="Description"
            type="textarea"
            id="description"
            name="cardDescription"
            value={ cardDescription }
            onInputChange={ onInputChange }
            test="description-input"
          />
          <Input
            label="For"
            type="number"
            id="attr1"
            name="cardAttr1"
            value={ cardAttr1 }
            onInputChange={ onInputChange }
            test="attr1-input"
          />
          <Input
            label="Int"
            type="number"
            id="attr2"
            name="cardAttr2"
            value={ cardAttr2 }
            onInputChange={ onInputChange }
            test="attr2-input"
          />
          <Input
            label="Cri"
            type="number"
            id="attr3"
            name="cardAttr3"
            value={ cardAttr3 }
            onInputChange={ onInputChange }
            test="attr3-input"
          />

          <label htmlFor="select" className="input-group-text">
            Rarity:
            <select
              className="form-select"
              id="select"
              name="cardRare"
              onChange={ onInputChange }
              value={ cardRare }
              data-testid="rare-input"
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>

          { hasTrunfo ? <p id="w">Você já tem um Super Trunfo em seu baralho</p> : <Input
            label="Super Trunfo?"
            type="checkbox"
            id="checkbox"
            name="cardTrunfo"
            value={ cardTrunfo }
            onInputChange={ onInputChange }
            test="trunfo-input"
          />}
          <button
            className="btn btn-dark"
            type="submit"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </form>

      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.number.isRequired,
  cardAttr2: PropTypes.number.isRequired,
  cardAttr3: PropTypes.number.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
