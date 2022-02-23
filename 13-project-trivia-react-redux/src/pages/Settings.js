import React from 'react';

import './css/settings.css';

class Settings extends React.Component {
  render() {
    return (
      <div className="config-container">
        <h1 data-testid="settings-title" className="config-message">Em construção</h1>
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
