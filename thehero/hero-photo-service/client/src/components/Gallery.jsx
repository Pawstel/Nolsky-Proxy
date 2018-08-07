import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './gallery.css';


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: this.props.galleryPhotos,
      mainPhoto: this.props.galleryPhotos[0].photo_url,
      mainPhotoIndex: 0,
      carrBeginIndex: 0,
      carrEndIndex: 8,
      displayCarr: true,
      detailedMessage: 'Hide photo list',
      triangleSymbol: 'https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/downtringle.png',
    };
    this.updateCarrousel = this.updateCarrousel.bind(this);
  }

  componentDidMount() {
    console.log('da fotos! ', this.state.photos);
  }


  updateCarrousel() {
    if (this.state.mainPhotoIndex <= 4) {
      this.setState({ carrBeginIndex: 0 });
      this.setState({ carrEndIndex: 8 });
    } else if (this.state.mainPhotoIndex > 4 && this.state.mainPhotoIndex < 10 && this.state.mainPhotoIndex < this.state.photos.length) {
      this.setState({ carrBeginIndex: this.state.mainPhotoIndex - 4 });
      this.setState({ carrEndIndex: this.state.mainPhotoIndex + 4 });
    } else {
      this.setState({ carrBeginIndex: this.state.photos.length - 9 });
      this.setState({ carrEndIndex: this.state.photos.length - 1 });
    }
    console.log('main: ', this.state.mainPhotoIndex);
    console.log('begin: ', this.state.carrBeginIndex);
    console.log('end: ', this.state.carrEndIndex);
  }

  showNextPhoto() {
    let newIndex = 0;
    if (this.state.mainPhotoIndex === 14) {
      newIndex = 0;
    } else {
      newIndex = this.state.mainPhotoIndex + 1;
    }
    this.setState({ mainPhotoIndex: newIndex }, () => { // setState takes a callback as its second argument
      this.setState({ mainPhoto: this.props.galleryPhotos[newIndex].photo_url }, () => {
        this.updateCarrousel();
      });
    });
  }

  showPrevPhoto() {
    let newIndex = 0;
    if (this.state.mainPhotoIndex === 0) {
      newIndex = 14;
    } else {
      newIndex = this.state.mainPhotoIndex - 1;
    }
    this.setState({ mainPhotoIndex: newIndex }, () => {
      this.setState({ mainPhoto: this.props.galleryPhotos[newIndex].photo_url }, () => {
        this.updateCarrousel();
      });
    });
  }

  showClickedPhoto(newMainPhoUrl, newMainPhotoIndex) {
    this.setState({ mainPhoto: newMainPhoUrl }, () => {
      this.setState({ mainPhotoIndex: newMainPhotoIndex }, () => {
        this.updateCarrousel();
      });
    });
    
    console.log('clicked ', newMainPhoUrl, newMainPhotoIndex);
  }

  toggleCarrousel() {
    const isDisp = this.state.displayCarr;
    this.setState({ displayCarr: !isDisp });

    const detMes = this.state.detailedMessage;
    let newMes = '';
    let newTriangle = '';
    if (detMes === 'Hide photo list') {
      newMes = 'Show photo list';
      newTriangle = './uptriangle.png';
    } else {
      newMes = 'Hide photo list';
      newTriangle = './downtriangle.png';
    }

    this.setState({ detailedMessage: newMes }, () => {
      this.setState({ triangleSymbol: newTriangle });
    });
  }

  showCarrousel() {
    this.setState({ displayCarr: true });
    this.setState({ detailedMessage: 'Hide photo list' }, () => {
      this.setState({ triangleSymbol: './downtriangle.png' });
    });
  }


  render() {
    const theCarrousel = this.state.displayCarr ? (
      <div styleName="carrousel-container">
        <div styleName="carrousel">
          {
              this.state.photos.map((photo, index) => {
                if (index >= this.state.carrBeginIndex && index <= this.state.carrEndIndex)  {
                if (this.state.mainPhoto === photo.photo_url) {
                  return <img onClick={() => { this.showClickedPhoto(photo.photo_url, index); }} styleName="carrousel-photo-selected" src={photo.photo_url} />;
                } 
                 else if  (index === this.state.carrEndIndex && (index >= 8) && (this.state.photos.length - index > 1)) {
                  return (
                    <div styleName="last-photo-holder">
                      <img onClick={() => { this.showClickedPhoto(photo.photo_url, index); }} styleName="carrousel-photo" src={photo.photo_url} />
                    </div>
                  );
                } else if (index === this.state.carrBeginIndex && ((this.state.mainPhotoIndex - index) > 3)) {
                  return (
                    <div styleName="last-photo-holder">
                      <img onClick={() => { this.showClickedPhoto(photo.photo_url, index); }} styleName="carrousel-photo" src={photo.photo_url} />
                    </div>
                  );
                }
                else /*if (index >= this.state.carrBeginIndex  && index < this.state.carrEndIndex)*/ {
                  return <img onClick={() => { this.showClickedPhoto(photo.photo_url, index); }} styleName="carrousel-photo" src={photo.photo_url} />;
                } 
              }
              })
              }
        </div>
      </div>
    ) : null;
    return (
      <div styleName="gallery">
        <div styleName="xbutton-container">
          <img onClick={this.props.onClick} src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/xsymbol.png" styleName="xbutton" />
        </div>

        <div styleName="prevnext-container">
          <img onClick={this.showPrevPhoto.bind(this)} styleName="prevnext-image" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/prevsymbol.png" />
          <img onClick={this.showNextPhoto.bind(this)} styleName="main-image" src={this.state.mainPhoto} />
          <img onClick={this.showNextPhoto.bind(this)} styleName="prevnext-image" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/nextsymbol.png" />
        </div>

        <div onMouseEnter={this.showCarrousel.bind(this)} styleName="details-container">
          <div styleName="details">
            <p>
              {' '}
              { this.state.mainPhotoIndex + 1 }
               /
              { this.props.galleryPhotos.length }
              {' '}
              { this.props.galleryPhotos[this.state.mainPhotoIndex].photo_description }
              {' '}
            </p>
            <p onClick={this.toggleCarrousel.bind(this)}>
              {' '}
              {this.state.detailedMessage}
              {' '}
              <img styleName="triangle-symbol" src={this.state.triangleSymbol} />
              {' '}
            </p>
          </div>
        </div>

        {theCarrousel}

      </div>
    );
  }
}

export default CSSModules(Gallery, styles);
