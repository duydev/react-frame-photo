import React from 'react';
import 'w3-css/w3.css';
import './style.css';

import { remote } from 'fetch-base64';

import { InteractiveZone } from '../InteractiveZone/InteractiveZone';
import { ControlPanel } from '../ControlPanel/ControlPanel';

class SinglePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userPhoto:
        'https://video-thumbs-ext.mediacdn.vn/thumb_w/650/2019/5/6/minh-nghi-15571602825331833982918.png',
      framePhoto: 'http://doanhoi.svydtb.edu.vn/uploads/news/2018_10/1.png',
      croppedPhoto: null
    };
  }

  croppedPhoto = data => {
    this.setState({ croppedPhoto: data });
  };

  doDownload = () => {
    this.refs.interactiveZone.crop();

    setTimeout(() => {
      var clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
      });
      const a = document.createElement('a');
      a.href = this.state.croppedPhoto;
      a.download = 'image.png';
      a.dispatchEvent(clickEvent);
    }, 500);
  };

  doUpload = dataURL => {
    this.setState({ userPhoto: dataURL });
  };

  doRotate = left => {
    this.refs.interactiveZone.rotate(left);
  };

  doZoom = zoomIn => {
    this.refs.interactiveZone.zoom(zoomIn);
  };

  doReset = () => {
    this.refs.interactiveZone.reset();
  };

  render() {
    return (
      <div className="single-page w3-container w3-row">
        <div className="page-left w3-col m6">
          <InteractiveZone
            ref="interactiveZone"
            photoURL={this.state.userPhoto}
            frameURL={this.state.framePhoto}
            onCropped={this.croppedPhoto}
          />
        </div>
        <div className="page-right w3-col m6">
          <ControlPanel
            onClickDownload={this.doDownload}
            onClickUpload={this.doUpload}
            onClickRotate={this.doRotate}
            onClickZoom={this.doZoom}
            onClickReset={this.doReset}
          />
        </div>
      </div>
    );
  }
}

export { SinglePage };
