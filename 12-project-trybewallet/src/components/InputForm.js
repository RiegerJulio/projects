import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputForm extends Component {
  render() {
    const { label, name, testid, type, onChange, value } = this.props;
    return (
      <>
        <span>{label}</span>
        <label htmlFor={ testid }>
          <input
            name={ name }
            type={ type }
            onChange={ onChange }
            value={ value }
            data-testid={ testid }
          />
        </label>
      </>
    );
  }
}

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
