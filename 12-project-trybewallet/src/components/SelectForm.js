import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectForm extends Component {
  render() {
    const { label, name, testid, options, onChange, value, id } = this.props;
    return (
      <>
        <span>{label}</span>
        <label htmlFor={ id }>
          <select
            name={ name }
            onChange={ onChange }
            value={ value }
            data-testid={ testid }
            id={ id }
          >
            {options.map((option) => (
              <option key={ option } value={ option }>
                { option }
              </option>
            ))}
          </select>
        </label>
      </>
    );
  }
}

SelectForm.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

// proptypes.any achado na referencia https://www.npmjs.com/package/prop-types;
