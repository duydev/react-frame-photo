import React from 'react';
import Cropper from '../Cropper/Cropper';
import 'cropperjs/dist/cropper.css';
import PropTypes from 'prop-types';

class ImageCropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alt: 'This is a user photo',
      imgData: null
    };
  }

  cropImage() {
    this.refs.cropper.crop();
    this.scaleCropBox();
    const canvas = this.refs.cropper.getCroppedCanvas();
    this.props.onCropped(canvas.toDataURL());
  }

  rotateImage(left) {
    this.refs.cropper.rotate(left ? -90 : 90);
  }

  zoomImage(zoomIn) {
    this.refs.cropper.zoom(zoomIn ? 0.1 : -0.1);
  }

  resetImage() {
    this.refs.cropper.reset();
  }

  scaleCropBox = () => {
    this.refs.cropper.setCropBoxData({
      left: 0,
      top: 0,
      width: Number.MAX_SAFE_INTEGER,
      height: Number.MAX_SAFE_INTEGER
    });
  };

  componentDidMount() {
    this.scaleCropBox();
  }

  render() {
    return (
      <Cropper
        ref="cropper"
        src={this.props.imageURL}
        style={{ height: '100%', width: this.props.size }}
        aspectRatio={1}
        guides={false}
        alt={this.state.alt}
        checkOrientation={false}
        checkCrossOrigin={true}
        crossOrigin="Anonymous"
        dragMode={'move'}
        modal={false}
        highlight={false}
        viewMode={0}
        autoCrop={false}
        center={false}
        cropBoxResizable={false}
        cropBoxMovable={false}
      />
    );
  }
}

ImageCropper.propTypes = {
  imageURL: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onCropped: PropTypes.func.isRequired
};

export { ImageCropper };
