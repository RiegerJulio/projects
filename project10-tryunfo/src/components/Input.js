import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { name, label, type, value, onInputChange, id, test } = this.props;
    return (
      <label htmlFor={ id } className="input-group-text">
        {label}
        :
        {type === 'checkbox' ? (
          <input
            type={ type }
            name={ name }
            id={ id }
            checked={ value }
            onChange={ onInputChange }
            data-testid={ test }
          />
        ) : (
          <input
            className="form-control form-control-sm"
            type={ type }
            name={ name }
            id={ id }
            value={ value }
            onChange={ onInputChange }
            data-testid={ test }
          />
        )}
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};

export default Input;
