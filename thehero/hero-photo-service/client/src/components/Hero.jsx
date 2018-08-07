import React from 'react';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import Modal from './Modal.jsx';
import Gallery from './Gallery.jsx';
import Save from './Save.jsx';
import Share from './Share.jsx';
import styles from './hero.css';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGalleryModal: false,
      showShareModal: false,
      showSaveModal: false,
      heroUrl: '',
      photos: [],
      saveStatus: false,
      savebuttonSymbol: '',
      saveButtonText: '',
      numberOfFav: 0,
      userId: 25,
      lists: [],
      listingId: this.props.listingId,
      favoriteLists: [],
      favoriteListsObj: {},
      details: {},
    };

    this.handleShowGallery = this.handleShowGallery.bind(this);
    this.handleHideGallery = this.handleHideGallery.bind(this);
    this.handleShowShare = this.handleShowShare.bind(this);
    this.handleHideShare = this.handleHideShare.bind(this);
    this.handleShowSave = this.handleShowSave.bind(this);
    this.handleHideSave = this.handleHideSave.bind(this);
  }

  componentDidMount() {
    this.getListingPhotos();
    this.getListsOfListing();
    this.getListingDetails();
  }

  handleShowGallery() {
    this.setState({ showGalleryModal: true });
  }

  handleHideGallery() {
    this.setState({ showGalleryModal: false });
  }

  handleShowShare() {
    this.setState({ showShareModal: true });
  }

  handleHideShare() {
    this.setState({ showShareModal: false });
  }

  handleShowSave() {
    console.log('number of favs ', this.state.numberOfFav);
    if (this.state.numberOfFav === 0 || this.state.numberOfFav > 1) {
     this.setState({ showSaveModal: true });
    } else if (this.state.numberOfFav === 1) {
      const listId = Object.keys(this.state.favoriteListsObj)[0]; // the one and only current favorite
      axios.delete(`/api/hero/listings/${this.state.listingId}/lists/${listId}`)
      .then((response) => {
        console.log(response);

        this.getListsOfListing();
      })
      .catch((error) => {
        console.log('Error in axios in delete favorite', error);
      });
    }
  }

  handleHideSave() {
    this.setState({ showSaveModal: false });
  }

  getListingPhotos() {
    axios.get(`/api/hero/listings/${this.state.listingId}/photos`)
      .then((response) => {
        this.setState({ heroUrl: response.data[0].photo_url });
        this.setState({ photos: response.data });
      })
      .catch((error) => {
        console.log('Axios error in getting listing photos ', error);
      });
  }


  handleSaveOnclicks(identifier) { // helpful in case one wants to pass in multiple functions to one component
    if (identifier === 1) { // to close the modal
      this.handleHideSave();
    } else if (identifier === 2) {
      this.getListsOfListing();
    } else if (identifier === 3) {
      this.getLists();
    }
  }

  getListsOfListing() {
    axios.get(`/api/hero/listings/${this.state.listingId}/lists`)
      .then((response) => {
        console.log('....', response.data);
        this.setState({ favoriteLists: response.data });

        this.getLists();
      })
      .catch((error) => {
        console.log('Axios error in getting data from listings_lists');
      });
  }

  getLists() {
    axios.get(`/api/hero/users/${this.state.userId}/list`)
      .then((response) => {
        console.log('Lists data: ', response.data);

        const tempLists = response.data;
        let isAtLeastOneList = false;
        let theNumberOfFavs = 0;


        const objectOfFavLists = {};
        for (let i = 0; i < this.state.favoriteLists.length; i++) {
          theNumberOfFavs += 1;
          objectOfFavLists[this.state.favoriteLists[i].list_id] = 'aaa';
          isAtLeastOneList = true;
        }

        this.setState({ numberOfFav: theNumberOfFavs });

        if (isAtLeastOneList === true) {
          this.setState({ saveButtonText: 'Saved' }, () => {
            this.setState({ savebuttonSymbol: 'https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/pinkheart.png' }, () => {
              this.setState({ saveStatus: true });
            });
          });
        } else {
          this.setState({ saveButtonText: 'Save' }, () => {
            this.setState({ savebuttonSymbol: 'https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/savesymbol.png' }, () => {
              this.setState({ saveStatus: false });
            });
          });
        }

        this.setState({ favoriteListsObj: objectOfFavLists }); // used in toggleFavorites function

        // now we are sure that the favoritelists are on the objectOfFavLists
        for (let i = 0; i < tempLists.length; i++) {
          const dd = tempLists[i].id;
          if (objectOfFavLists[tempLists[i].id]) {
            tempLists[i].icon = 'https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/pinkheart.png';
          } else {
            tempLists[i].icon = 'https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/savesymbol.png';
          }
        }

        this.setState({ lists: tempLists });
      })
      .catch((error) => {
        console.log('Axios error in getting lists ', error);
      });
  }

  getListingDetails() {
    axios.get(`/api/hero/listings/${this.state.listingId}/details`)
      .then((response) => {
        this.setState({ details: response.data[0] }, () => {
          // this.setReviewArray();
          console.log('the details', this.state.details);
        });
      })
      .catch((error) => {
        console.log('Axios error in getting listing photos ', error);
      });
  }


  render() {
    const imgUrl = this.state.heroUrl;
    const divStyle = {
      backgroundImage: `url(${imgUrl})`,
  
    };

    let modal = null;
    if (this.state.showGalleryModal === true) {
      modal = (
      <Modal>
        <div styleName="modal-dark-black">
          <Gallery galleryPhotos={this.state.photos} onClick={this.handleHideGallery.bind(this)} />
        </div>
      </Modal>
      );
    } else if (this.state.showShareModal === true) {
      modal = (
      <Modal>
        <div styleName="modal-light-black">
          <Share details={this.state.details} onClick={this.handleHideShare.bind(this)} />
        </div>
      </Modal>
      );
    } else if (this.state.showSaveModal === true) {
      modal = (
      <Modal>
        <div styleName="modal-white">
          <Save heroUrl={this.state.heroUrl} heroDescription={this.state.photos[0].photo_description} lists={this.state.lists} favoriteListsObj={this.state.favoriteListsObj} userId={this.state.userId} listingId={this.state.listingId} details={this.state.details} onClick={this.handleSaveOnclicks.bind(this)} />
        </div>
      </Modal>
      );
    } else {
      modal = null;
    }

    return (
      <div style={divStyle} styleName="hero">
        <button styleName="hero-view-photos-button" onClick={this.handleShowGallery}>
View Photos
        </button>
        {modal}
        <div styleName="hero-top-right-buttons">
          <button styleName="hero-share-button" onClick={this.handleShowShare}>
            <img styleName="hero-button-image" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/sharesymbol.png" />
              Share
          </button>
          <button styleName="hero-save-button" onClick={this.handleShowSave}>
            <img styleName="hero-button-image" src={this.state.savebuttonSymbol} />
            {this.state.saveButtonText}
          </button>
        </div>
      </div>
    );
  }
}

export default CSSModules(Hero, styles);
/*window.Hero = Hero;
*/module.exports.Hero = Hero;
