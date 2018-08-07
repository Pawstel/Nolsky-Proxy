DROP DATABASE IF EXISTS hero;
CREATE DATABASE hero; 

USE hero; 

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT, 
  user_name VARCHAR(30) NOT NULL, 
  user_membership_date DATE NOT NULL,
  user_photo_url VARCHAR(250) NOT NULL, 
  PRIMARY KEY(id)
);



CREATE TABLE lists (
  id INT NOT NULL AUTO_INCREMENT,
  list_name VARCHAR(50) , 
  list_user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(list_user_id) REFERENCES users(id)
);



CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT, 
  listing_review_average INT,
  listing_review_total INT,
  listing_host_name VARCHAR(50),
  listing_address TEXT, 
  listing_host_photo_url VARCHAR(255),
  listing_description TEXT,
  listing_space_description TEXT, 
  listing_neighborhood_description TEXT,
  PRIMARY KEY(id)

);



CREATE TABLE listings_lists (
  listing_id INT NOT NULL, 
  list_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (list_id) REFERENCES lists(id)
);



CREATE TABLE listing_photos (
	id INT NOT NULL AUTO_INCREMENT, 
	photo_description VARCHAR(255),
	photo_url VARCHAR(200) NOT NULL,
  photo_listing_id INT NOT NULL,
	PRIMARY KEY(id),
  FOREIGN KEY(photo_listing_id) REFERENCES listings(id)

);


