
const request = require('supertest');
const app = require('../server/app.js');


describe('Test the root path', () => {
  test('It should response the GET method', () => request(app).get('/').then((response) => {
    expect(response.statusCode).toBe(200);
  }));
});

describe('Request to get listings photos (getListingPhotos)', () => {
  test('Output array should have 15 elements', () => request(app).get('/listings/4/photos').then((response) => {
    expect(JSON.parse(response.text).length).toBe(15);
  }));
});


describe('Request to get lists for a given user', () => {
  test('Output object should have the following 3 properties', () => request(app).get('/users/5/list').then((response) => {
    expect(JSON.parse(response.text)[0]).toHaveProperty('id');
    expect(JSON.parse(response.text)[0]).toHaveProperty('list_name');
    expect(JSON.parse(response.text)[0]).toHaveProperty('list_user_id');
  }));
});

describe('Request to add a list', () => {
  test('Request should be created', () => request(app).post('/users/5/addList').then((response) => {
    expect(response.text).toBe('Created');
  }));
});

describe('Request to get lists for a listing', () => {
  test('Output object should have the following 3 properties', () => request(app).get('/listings/3/lists').then((response) => {
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_id');
    expect(JSON.parse(response.text)[0]).toHaveProperty('list_id');
  }));
});

describe('Request to add a list to favorites', () => {
  test('Request should be created', () => request(app).post('/listings/2/lists/4').then((response) => {
    expect(response.text).toBe('Created');
  }));
});

describe('Request to delete a list from favorites', () => {
  test('Request should be ok', () => request(app).delete('/listings/2/lists/4').then((response) => {
    expect(response.text).toBe('OK');
  }));
});

describe('Request to get listing details for a listing', () => {
  test('Output object should have the following 9 properties', () => request(app).get('/listings/3/details').then((response) => {
    expect(JSON.parse(response.text)[0]).toHaveProperty('id');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_review_average');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_review_total');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_host_name');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_address');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_host_photo_url');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_description');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_space_description');
    expect(JSON.parse(response.text)[0]).toHaveProperty('listing_neighborhood_description');

  }));
});
