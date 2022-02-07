import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    return (
      <div className="spinner-border text-success" role="status">
        {/* <span className="sr-only">Carregando...</span> */}
      </div>
    );
  }
}
