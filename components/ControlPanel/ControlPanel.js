import React from 'react';

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
      <div className="control-panel w3-row w3-container">
        <div className="w3-row w3-margin">
          <input
            type="file"
            ref="uploadFile"
            className="w3-hide"
            onChange={this.changeUserPhoto}
          />
          <button
            type="button"
            className="w3-btn w3-teal w3-block w3-padding-large"
            onClick={this.triggerUploadFile}
          >
            Upload photo
          </button>
        </div>
        <div className="w3-row w3-margin">
          <button
            type="button"
            className="w3-btn w3-khaki w3-col m6"
            onClick={() => this.props.onClickRotate(true)}
          >
            Rotate Left
          </button>
          <button
            type="button"
            className="w3-btn w3-khaki w3-col m6"
            onClick={() => this.props.onClickRotate(false)}
          >
            Rotate Right
          </button>
        </div>
        <div className="w3-row w3-margin">
          <button
            type="button"
            className="w3-btn w3-khaki"
            style={{ width: '50%' }}
            onClick={() => this.props.onClickZoom(true)}
          >
            Zoom In
          </button>
          <button
            type="button"
            className="w3-btn w3-khaki"
            style={{ width: '50%' }}
            onClick={() => this.props.onClickZoom(false)}
          >
            Zoom Out
          </button>
        </div>
        <div className="w3-row w3-margin">
          <button
            type="button"
            className="w3-btn w3-red w3-block w3-padding-large"
            onClick={this.props.onClickReset}
          >
            Reset
          </button>
        </div>
        <div className="w3-row w3-margin">
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
