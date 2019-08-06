import React from 'react';
import './style.css';

import { PropTypes } from 'prop-types';

class ControlPanel extends React.Component {
  triggerUploadFile = () => {
    this.refs.uploadFile.click();
  };

  changeUserPhoto = file => {
    var input = file.target;

    var reader = new FileReader();

    reader.onload = () => {
      var dataURL = reader.result;
      this.props.onClickUpload(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  render() {
    return (
      <div className="control-panel w3-row">
        <div className="w3-row">
          <input
            type="file"
            ref="uploadFile"
            className="w3-hide"
            onChange={this.changeUserPhoto}
          />
          <button
            type="button"
            className="w3-btn w3-teal w3-block w3-col"
            onClick={this.triggerUploadFile}
          >
            Upload photo
          </button>
        </div>
        <div className="w3-row">
          <div className="w3-col m6 s6" style={{ paddingRight: 4 }}>
            <button
              type="button"
              className="w3-btn w3-khaki w3-block"
              onClick={() => this.props.onClickRotate(true)}
            >
              Rotate Left
            </button>
          </div>
          <div className="w3-col m6 s6" style={{ paddingLeft: 4 }}>
            <button
              type="button"
              className="w3-btn w3-khaki w3-block"
              onClick={() => this.props.onClickRotate(false)}
            >
              Rotate Right
            </button>
          </div>
        </div>
        <div className="w3-row">
          <div className="w3-col m6 s6" style={{ paddingRight: 4 }}>
            <button
              type="button"
              className="w3-btn w3-khaki w3-block"
              onClick={() => this.props.onClickZoom(true)}
            >
              Zoom In
            </button>
          </div>
          <div className="w3-col m6 s6" style={{ paddingLeft: 4 }}>
            <button
              type="button"
              className="w3-btn w3-khaki w3-block"
              onClick={() => this.props.onClickZoom(false)}
            >
              Zoom Out
            </button>
          </div>
        </div>
        <div className="w3-row">
          <button
            type="button"
            className="w3-btn w3-red w3-block w3-padding-large"
            onClick={this.props.onClickReset}
          >
            Reset
          </button>
        </div>
        <div className="w3-row">
          <button
            type="button"
            className="w3-btn w3-teal w3-block w3-padding-large"
            onClick={this.props.onClickDownload}
          >
            Download
          </button>
        </div>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  onClickDownload: PropTypes.func.isRequired,
  onClickUpload: PropTypes.func.isRequired,
  onClickRotate: PropTypes.func.isRequired,
  onClickZoom: PropTypes.func.isRequired,
  onClickReset: PropTypes.func.isRequired
};

export { ControlPanel };
