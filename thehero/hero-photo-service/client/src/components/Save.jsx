import React from 'react';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import styles from './save.css';

class Save extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTopPart: true,
      showBottomPart: false,
    	showCreateNewListMessage: true,
    	showNewListInfo: false,
    	userId: 0,
    	lists: [],
    	newListName: '',
    	listingId: 0,
    	favoriteListsObj: {},
    	ratings: [0, 0, 0, 0],
    	details: {},
    };

    this.handleShowTopPart = this.handleShowTopPart.bind(this);
  }

  componentDidMount() {
  	this.setState({ lists: this.props.lists });
  	this.setState({ favoriteListsObj: this.props.favoriteListsObj });
  	this.setState({ userId: this.props.userId });
  	this.setState({ listingId: this.props.listingId });
    this.setState({ details: this.props.details }, () => {
      this.setReviewArray();
    });
  }

  componentDidUpdate(prevProps) {
  	if (this.props.lists !== prevProps.lists) { // IT IS EXTREMLY IMPORTANT TO CHECK THE CURRENT AND THE PREVIOUS PROPS. THIS IS REACT DOCUMENTATION. ELSE IT BREAK AND RENDERS TWICE!!
  		this.setState({ lists: this.props.lists });
  	}

  	if (this.props.favoriteListsObj !== prevProps.favoriteListsObj) {
  		this.setState({ favoriteListsObj: this.props.favoriteListsObj });
  	}

  	if (this.props.userId !== prevProps.userId) {
  		this.setState({ userId: this.props.userId });
  	}

  	if (this.props.listingId !== prevProps.listingId) {
  		this.setState({ listingId: this.props.listingId });
  	}

    if (this.props.details !== prevProps.details) {
      this.setState({ details: this.props.details });
    }
  }


  handleListNameChange(e) {
  	this.setState({ newListName: e.target.value });
  	// console.log(e.target.value);
  }

  cancel() {
  	this.setState({ showCreateNewListMessage: true });
  	this.setState({ showNewListInfo: false });
  }

  create() {
  	axios.post(`/api/hero/users/${this.state.userId}/addList`, {
  		list_name: this.state.newListName,
  	  })
  	.then((response) => {
  		console.log(response);
  		this.props.onClick(3);
  		this.setState({ showCreateNewListMessage: true });
  	    this.setState({ showNewListInfo: false });
  	})
  	.catch((error) => {
  		console.log('Error in axios in making new list');
  	});
  }

  showOptionsForNewList() {
  	this.setState({ showCreateNewListMessage: false });
  	this.setState({ showNewListInfo: true });
  }


  toggleFavorite(e) {
  	const listId = e.target.name;

  	if (this.state.favoriteListsObj[listId]) {
  		// This is liked, must now remove
  		axios.delete(`/api/hero/listings/${this.state.listingId}/lists/${listId}`)
  		.then((response) => {
  			console.log(response);
  			// this.getListsOfListing();
  			this.props.onClick(2);
  		})
  		.catch((error) => {
  			console.log('Error in axios in delete favorite', error);
  		});
  	} else {
  		// This is not liked, must now add
  		axios.post(`/api/hero/listings/${this.state.listingId}/lists/${listId}`)
  		.then((response) => {
  			console.log(response);
  			this.props.onClick(2);
  		})
  		.catch((error) => {
  			console.log('Error in axios in adding new favorite', error);
  		});
  	}
  }

  setReviewArray() {
  	const outputArr = [];
  	let paws = this.state.details.listing_review_average;
  	for (let i = 0; i < 4; i++) {
  		if (paws > 0) {
  			outputArr.push(1);
  			paws -= 1;
  		} else {
  			outputArr.push(0);
  		}
  	}
  	this.setState({ ratings: outputArr });
  }

  handleHideTopPart() {
    this.setState({ showTopPart: false });
    this.handleShowBottomPart();
  }

  handleShowTopPart() {
    this.setState({ showTopPart: true });
    this.handleHideBottomPart();
  }

  handleHideBottomPart() {
    this.setState({ showBottomPart: false });
  }

  handleShowBottomPart() {
    this.setState({ showBottomPart: true });
  }


  render() {
    let theNewListMessage = null;
    let theNewListInfo = null;
    let topPart = null;
    let bottomPart = null;
    let dropSymbol = null;

    if (this.state.showCreateNewListMessage === true) {
    	theNewListMessage = (
      <div styleName="create-new-list-container">
        <h3 styleName="create-new-list" onClick={this.showOptionsForNewList.bind(this)}>
          {' '}
Create a new list
          {' '}
        </h3>
      </div>
      );
    } else {
    	theNewListMessage = null;
    }

    if (this.state.showNewListInfo === true) {
    	theNewListInfo = (
      <div styleName="new-list-info-container">
        <div styleName="new-list-name-container">
          <h3 styleName="new-list-name">
            {' '}
Name
            {' '}
          </h3>
        </div>

        <div styleName="new-list-input-container">
          <input type="text" styleName="new-list-input" onChange={this.handleListNameChange.bind(this)} />
        </div>

        <div styleName="new-list-buttons-container">
          <button styleName="new-list-cancel-button" onClick={this.cancel.bind(this)}>
            {' '}
Cancel
            {' '}
          </button>
          <button styleName="new-list-create-button" onClick={this.create.bind(this)}>
            {' '}
Create
            {' '}
          </button>
        </div>

      </div>
      );
    } else {
    	theNewListInfo = null;
    }


    if (this.state.showTopPart === true) {
      topPart = (
        <div styleName="top-part-container">
          <div styleName="xbutton-container">
            <img styleName="xbutton" onClick={() => { this.props.onClick(1); }} src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/blackx.png" />
          </div>

          <div styleName="title-container">
            <h1 styleName="title">
              {' '}
Save to list
              {' '}
            </h1>
          </div>


          {theNewListMessage}

          {theNewListInfo}


          <div styleName="list-container">

            <div styleName="list">

              {
            this.state.lists.map(list => (
              <div styleName="list-item">
                <p>
                  {list.list_name}
                </p>

                <img styleName="list-save-button" name={list.id} src={list.icon} onClick={this.toggleFavorite.bind(this)} />
              </div>
            ))
            }

            </div>

          </div>

        </div>
      );
    } else {
      topPart = null;
      dropSymbol = (
        <div onClick={this.handleShowTopPart.bind(this)}>
          <img styleName="footer-drop-symbol" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/drop.png" />
        </div>
      );
    }

    if (this.state.showBottomPart === true) {
      bottomPart = (
        <div styleName="bottom-part-container">
          <div styleName="bottom-part">
            <div styleName="bottom-description-container">
              <div styleName="bottom-description-title">
             About the listing
              </div>

              <div styleName="bottom-description-text">
                {this.state.details.listing_description}
              </div>
            </div>

            <div styleName="bottom-description-container">
              <div styleName="bottom-description-title">
             The Space
              </div>

              <div styleName="bottom-description-text">
              {this.state.details.listing_space_description}
              </div>
            </div>

            <div styleName="bottom-description-container">
              <div styleName="bottom-description-title">
             Neighborhood
              </div>

              <div styleName="bottom-description-text">
              {this.state.details.listing_neighborhood_description}
              </div>
            </div>
          </div>
        </div>
      );
    }

  	return (
    <div styleName="save-container">
      <div styleName="save">

        {topPart}

        <div styleName="footer-container">
          {dropSymbol}

          <div styleName="footer" onClick={this.handleHideTopPart.bind(this)}>
            <div>
              <img styleName="footer-hero-pic" src={this.props.heroUrl} />
            </div>

            <div styleName="footer-text-and-review-container">

              <div styleName="footer-description-container">
                <div styleName="footer-description">
                  {' '}
                  {this.props.heroDescription}
                  {' '}
                </div>
              </div>

              <div styleName="footer-address-container">
                <div styleName="footer-address">
                  {' '}
                  {this.state.details.listing_address}
                  {' '}
                </div>
              </div>

              <div styleName="footer-paws-container">
                <div styleName="footer-paws">
                  {
		               this.state.ratings.map((rating) => {
		               	if (rating === 1) {
		               		return <img styleName="paw" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/full.png" />;
		               	} if (rating === 0) {
		               		return <img styleName="paw" src="https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/static-assets/grey.png" />;
		               	}
		               })
		             }
                </div>

                <div styleName="number-reviews">
                  {this.state.details.listing_review_total}
                  {' '}
Reviews

                  {' '}
                </div>
              </div>

            </div>

          </div>
        </div>

        {bottomPart}

      </div>
    </div>
    );
  }
}

export default CSSModules(Save, styles);
