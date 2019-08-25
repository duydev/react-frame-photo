import React from 'react';
import 'w3-css/w3.css';
import './style.css';
import socketIOClient from 'socket.io-client';

import { InteractiveZone } from '../InteractiveZone/InteractiveZone';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import Loading from '../Loading/Loading';

class SinglePage extends React.Component {
  state = {
    userPhoto: '',
    framePhoto: '',
    croppedPhoto: null,
    isLoading: true
  };

  socket = socketIOClient();

  componentDidMount() {
    this.toggleLoading(true);

    this.socket.on('responseInitialData', (framePhotoURL, defaultImageURL) => {
      this.setState({ framePhoto: framePhotoURL, userPhoto: defaultImageURL });
      this.toggleLoading(false);
    });

    this.socket.emit('requestInitialData', 0);
  }

  toggleLoading = show => {
    this.setState({ isLoading: Boolean(show) });
  };

  croppedPhoto = data => {
    this.setState({ croppedPhoto: data });
  };

  doDownload = () => {
    this.toggleLoading(true);

    this.refs.interactiveZone.crop();

    this.socket.on('responseCombineImage', imgData => {
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
      });

      const a = document.createElement('a');
      a.href = imgData;
      a.download = 'image.png';
      a.dispatchEvent(clickEvent);

      this.toggleLoading(false);
    });

    setTimeout(() => {
      this.socket.emit('requestCombineImage', 0, this.state.croppedPhoto);
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
      <div className="w3-container">
        {this.state.isLoading && <Loading />}
        <div className="single-page w3-container w3-row">
          <div className="page-left w3-col m6 s12">
            <InteractiveZone
              ref="interactiveZone"
              photoURL={this.state.userPhoto}
              frameURL={this.state.framePhoto}
              onCropped={this.croppedPhoto}
            />
          </div>
          <div className="page-right w3-col m6 s12">
            <ControlPanel
              onClickDownload={this.doDownload}
              onClickUpload={this.doUpload}
              onClickRotate={this.doRotate}
              onClickZoom={this.doZoom}
              onClickReset={this.doReset}
            />
          </div>
        </div>
      </div>
    );
  }
}

export { SinglePage };
