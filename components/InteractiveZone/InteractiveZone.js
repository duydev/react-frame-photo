import React from 'react';
import './style.css';

import { PropTypes } from 'prop-types';

import { ImageCropper } from '../ImageCropper/ImageCropper';

class InteractiveZone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
  }

  updateCanvasHeight() {
    const elm = document.getElementById('interactive-zone');
    if (elm && elm.offsetWidth) {
      this.setState({ height: elm.offsetWidth || 0 });
    }
  }

  componentDidMount() {
    this.updateCanvasHeight();
    window.addEventListener('resize', () => {
      this.updateCanvasHeight();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.updateCanvasHeight();
    });
  }

  crop = () => {
    this.refs.cropper.cropImage();
  };

  rotate = left => {
    this.refs.cropper.rotateImage(left);
  };

  zoom = zoomIn => {
    this.refs.cropper.zoomImage(zoomIn);
  };

  reset = () => {
    this.refs.cropper.resetImage();
  };

  render() {
    return (
      <div
        id="interactive-zone"
        className="interactive-zone"
        style={{ height: this.state.height }}
      >
        <ImageCropper
          ref="cropper"
          imageURL={this.props.photoURL}
          alt="This is a user photo."
          onCropped={this.props.onCropped}
        />
        <div className="frame-photo" style={{ height: '100%', width: '100%' }}>
          <img id="frame-photo" src={this.props.frameURL} alt="" />
        </div>
      </div>
    );
  }
}

InteractiveZone.propTypes = {
  photoURL: PropTypes.string.isRequired,
  frameURL: PropTypes.string.isRequired,
  onCropped: PropTypes.func.isRequired
};

export { InteractiveZone };
