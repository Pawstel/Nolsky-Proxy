const Queries = require('../database/Queries.js');

describe('Query to get listings photos (getListingPhotos)', () => { // must make this an async function so that "await" may work
  test('Output array should have 15 elements', (done) => {
  	 Queries.getListingPhotos(2, (err, listingPhotos) => {
  		expect(listingPhotos.length).toBe(15);
  		done();
  	});
  });

  test('Each element of the output array should be an object with 4 properties', (done) => {
  	 Queries.getListingPhotos(2, (err, listingPhotos) => {
  		expect(listingPhotos[0]).toHaveProperty('id');
  		expect(listingPhotos[0]).toHaveProperty('photo_description');
  		expect(listingPhotos[0]).toHaveProperty('photo_url');
  		expect(listingPhotos[0]).toHaveProperty('photo_listing_id');
  		done();
  	});
  });
});

describe('Query to get lists (getLists)', () => { // must make this an async function so that "await" may work

  test('Each element of the output array should be an object with 3 properties', (done) => {
     Queries.getLists(2, (err, listingPhotos) => {
      expect(listingPhotos[0]).toHaveProperty('id');
      expect(listingPhotos[0]).toHaveProperty('list_name');
      expect(listingPhotos[0]).toHaveProperty('list_user_id');
      done();
    });
  });
});


describe('Query to addList (addList)', () => { // must make this an async function so that "await" may work

  test('Should add to the list table, thus no error', (done) => {
     Queries.addList(2, 'My New List',  (err, result) => {
      expect(err).toBe(null);
      done();
    });
  });
});


describe('Query to get list of listings', () => { // must make this an async function so that "await" may work

  test('Each element of the output array should be an object with 2 properties', (done) => {
     Queries.getListsOfListing(2, (err, listingPhotos) => {
      expect(listingPhotos[0]).toHaveProperty('listing_id');
      expect(listingPhotos[0]).toHaveProperty('list_id');
      done();
    });
  });
});

describe('Query to add to favorites ', () => { // must make this an async function so that "await" may work

  test('Should add to the listings_lists table, thus no error', (done) => {
     Queries.addToFavorite(2, 3,  (err, result) => {
      expect(err).toBe(null);
      done();
    });
  });
});


describe('Query to remove from favorites ', () => { // must make this an async function so that "await" may work

  test('Should remove from the listings_lists table, thus no error', (done) => {
     Queries.removeFromFavorite(2, 3,  (err, result) => {
      expect(err).toBe(null);
      done();
    });
  });
});

describe('Query to get listing details', () => { // must make this an async function so that "await" may work

  test('Each element of the output array should be an object with 9 properties', (done) => {
     Queries.getListingDetails(2, (err, listingPhotos) => {
      expect(listingPhotos[0]).toHaveProperty('id');
      expect(listingPhotos[0]).toHaveProperty('listing_review_average');
      expect(listingPhotos[0]).toHaveProperty('listing_review_total');
      expect(listingPhotos[0]).toHaveProperty('listing_host_name');
      expect(listingPhotos[0]).toHaveProperty('listing_address');
      expect(listingPhotos[0]).toHaveProperty('listing_host_photo_url');
      expect(listingPhotos[0]).toHaveProperty('listing_description');
      expect(listingPhotos[0]).toHaveProperty('listing_space_description');
      expect(listingPhotos[0]).toHaveProperty('listing_neighborhood_description');
      done();
    });
  });
});


