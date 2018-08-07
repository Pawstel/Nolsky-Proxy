const mysql = require('mysql');
//const Populator = require('./Populator.js')

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'abc',
  database: 'hero',
  port: '3306',
});


setTimeout(()=> {
  connection.connect((err) => {
    if (err) {
      console.log('Error connecting to mysql ', err);
    } else {
      console.log('Successful connection to mysql');
    }
  });

  const populateUsers = () => {
  for (let i = 1; i <= 100; i += 1) {
    const userNames = ['Neon', 'Omega', 'Kookaburra', 'RagingBull', 'Asylum', 'Flurry', 'Ollie', 'Scoobie', 'Brave', 'Guaymas', 'Pinochio', 'Danana', 'Pepita', 'Padila', 'Ninja', 'Bonza'];
    const years = ['2018', '2017', '2016', '2015', '2014'];
    const months = ['01', '03', '05', '07', '09'];
    const days = ['10', '13', '22', '18', '25'];
    const dateIndex = Math.floor(Math.random() * 5); // up to index 4
    const date = `${years[dateIndex]}-${months[dateIndex]}-${days[dateIndex]}`;
    const rand0and15 = Math.floor(Math.random() * 16); // up to index 15
    const userName = userNames[rand0and15];
    const userPhotoUrl = `https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/listings/user${rand0and15}.jpg`;

    const theQuery = `INSERT INTO users (user_name, user_membership_date, user_photo_url) VALUES ('${userName}', '${date}', '${userPhotoUrl}')`;
    connection.query(theQuery, (err, res) => {
      if (err) {
        console.log('Error in populating the users table', err);
      } else {
        console.log('Success in populating the users table', res);
      }
    });
  }
};


// to populate the lists table
const populateLists = () => {
  const listNames = ['My fav list!', 'Practical wuff houses', 'Da bestest', 'Super classy', '100% Chic'];
  let theQuery = '';
  for (let i = 1; i <= 100; i += 1) {
    // some users will have a list by default and others will not
    const listIndex = Math.floor(Math.random() * 5); // up to index 4
    const listName = listNames[listIndex];
    theQuery = `INSERT INTO lists (list_name, list_user_id) VALUES ('${listName}', ${i})`;
    connection.query(theQuery, (err, res) => {
      if (err) {
        console.log('Error in populating the lists table ', err);
      } else {
        console.log('Success in populating the lists table ', res);
      }
    });
  }
};


// to populate the listings table
const populateListings = () => {
  const hostName = ['Neon', 'Omega', 'Kookaburra', 'RagingBull', 'Asylum', 'Flurry', 'Ollie', 'Scoobie', 'Brave', 'Guaymas', 'Pinochio', 'Danana', 'Pepita', 'Padila', 'Ninja', 'Bonza'];

  const mockListingData = {
    adjectives: ['mewtiful', 'spacious', 'gllamarous', 'whale-built', 'open air', 'cozy', 'brand new', 'vibrant'],
    penType: ['doghouse', 'barn', 'fishbowl', 'lions den', 'nest', 'quiet hermit shell'],
    preposition: ['in', 'by', 'close to'],
    locale: ['ruff neighborhood', 'dog park', 'upscale guppie area', 'cowtown'],
  };

  const spaceDescriptionData = [
    'From the outside this house looks old, but wonderful. It has been built with brown bricks and has red brick decorations. Tall, squared windows allow enough light to enter the home and have been added to the house in a fairly asymmetrical pattern.',

    'The house is equipped with an old-fashioned kitchen and one small bathroom, it also has a warm living room, four bedrooms, a cozy dining room and a cozy storage room.',

    'The building is shaped like an L. The extension extends into wooden sunscreens structures circling around half the house.The second floor is the same size as the first, but part of it hangs over the edge of the floor below, creating an overhang on one side and a balcony on the other. This floor has a very different style than the floor below.',

    'The roof is low, triangular, but one side is longer than the other and is covered with brown roof tiles. Two small chimneys poke out the center of the roof. Rows of small windows let in plenty of light to the rooms below the roof.The house itself is surrounded by paved ground, with an outdoor eating and relaxing space and various potted plants.',

    'From the outside this house looks nice and traditional. It has been built with tan stones and has tan stone decorations. Small, half rounded windows add to the overall style of the house and have been added to the house in a very symmetric way.',

    'The house is equipped with a small kitchen and one small bathroom, it also has a cozy living room, two bedrooms, a small dining room and a roomy storage room.',

    'From the outside this house looks impressive. It has been built with bricks covered in render and has red pine wooden decorations. Small, rectangular windows add to the overall style of the house and have been added to the house in a fairly symmetrical pattern.',

    'The house is equipped with a modern kitchen and one average bathroom, it also has a small living room, five bedrooms, a modest dining area, a lounge area and a small garage.',

    'The building is shaped like a short U. The two extensions are linked by wooden sunscreens structures.The second floor is bigger than the first, which creates several overhanging parts on several sides of the house. This floor has a slightly different style than the floor below.',

    'The roof is low, triangular and layered and is covered with wood shingles. One small chimney sits at the side of the house. A few large windows let in just enough light to the rooms below the roof. The house itself is surrounded by a well kept garden, with a grass field and flower patches at the edges of the garden.'];


   const neighborhoodDescriptionData = [
    'Cast on the lowest point of a forest, the outpost of Pernrith is home to humans lead by Commander Masser. This outpost wasnt built by a forest by accident, as it has hidden tunnels, which is of great importance to the people of Pernrith and its success.',

    'The outpost itself looks luxuriant. With its yew wood rooftops, elm wood walls and white, sandy beaches, Pernrith has a intriguing atmosphere. The main attraction is the farm, which was built 54 years ago and designed by fairies.',

    'Pernrith has a flourishing economy, which is mainly supported by tailoring, armorsmithing and thieving. But their biggest strengths are highly skilled thieving and weaponsmithing. However, Pernrith lacks people skilled in crafting.',

    'Despite its strengths and weaknesses, Pernrith is most likely headed towards a affluent future under the leadership of Commander Masser. But this remains to be seen.',

    'Set on the peak of a wetlands, the township of Gloufry is home to gnomes lead by Director Bimbik. This township wasnt built by a wetlands by accident, as it has ancient burial grounds, which is of great importance to the people of Gloufry and its success.',

    'The township itself looks hideous. With its metal shingle rooftops, chiseled stone walls and scavenger birds, Gloufry has a eerie atmosphere. The main attraction is the graveyard, which was built 28 years ago and designed by halflings.',

    'Gloufry has a mending economy, which is mainly supported by leatherworking, farming and herbalism. But their biggest strengths are refined baking and alchemy. However, Gloufry lacks people skilled in war.',

    'Despite its strengths and weaknesses, Gloufry is most likely headed towards a horrible future under the leadership of Director Bimbik. But this remains to be seen.', 

    'Despite its strengths and weaknesses, Cullfield is most likely headed towards a harsh future under the leadership of Lady Gedney. But this remains to be seen.',

    'Cullfield has a damaged economy, which is mainly supported by animal breeding, cooking and wine brewing. But their biggest strengths are deadly archers and weaponsmithing. However, Cullfield lacks people skilled in alchemy.'
   ];


  const streetAdr = ['Woof Street', 'Miaw Street', 'Bone Street', 'Toy Street', 'Playground Street', 'Doggy Street', 'Kitty Street', 'Cooltown Street', 'Pet Street', 'Animal Town', 'Zomby Street', 'Thriller Street', 'Treat Street', 'Doggy Street', 'Rat Street', 'Kitten Street'];


  const cities = ['Miami', 'Port-au-Prince', 'Peking', 'Quito', 'Berlin', 'Kingston', 'Lagos', 'Capetown', 'Accra', 'Dakhar', 'Maputo', 'Tokyo', 'Bogota', 'Brasilia', 'London', 'Mexico City'];
  const countries = ['United States', 'Haiti', 'China', 'Ecuador', 'Germany', 'Jamaica', 'Nigeria', 'South Africa', 'Ghana', 'Senegal', 'Mozambique', 'Japan', 'Columbia', 'Bresil', 'England', 'Mexico'];
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


  const populateListingDescriptionsTable = () => {
    const adjectiveIndex = getRandomInt(0, mockListingData.adjectives.length - 1);
    const penTypeIndex = getRandomInt(0, mockListingData.penType.length - 1);
    const prepositionIndex = getRandomInt(0, mockListingData.preposition.length - 1);
    const localeIndex = getRandomInt(0, mockListingData.locale.length - 1);
    const description = `${mockListingData.adjectives[adjectiveIndex]} ${mockListingData.penType[penTypeIndex]} ${mockListingData.preposition[prepositionIndex]} ${mockListingData.locale[localeIndex]}`;
    return description;
  };


  for (let i = 1; i <= 100; i += 1) {
    // generate random number between 1 and 5
    const rand0and15 = Math.floor(Math.random() * 16); // up to index 15
    const rand0and9 = Math.floor(Math.random() * 10); // up to index 9
    const listingAverage = Math.floor(Math.random() * 4) + 1; // between 1 and 4
    const listingTotalReviews = Math.floor(Math.random() * 120);
    const listingDesc = populateListingDescriptionsTable();
    const spaceDesc = spaceDescriptionData[rand0and9];
    const neighborhoodDesc = neighborhoodDescriptionData[rand0and9];
    const listingHostPhotoUrl = `https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/listings/host${rand0and15}.jpg`;
    const address = `${streetAdr[rand0and15]}, ${cities[rand0and15]}, ${countries[rand0and15]}`;
    const theQuery = `INSERT INTO listings (listing_description, listing_review_average, listing_review_total, listing_host_name, listing_host_photo_url, listing_address, listing_space_description, listing_neighborhood_description) VALUE ('${listingDesc}', ${listingAverage}, ${listingTotalReviews}, '${hostName[rand0and15]}', '${listingHostPhotoUrl}', '${address}', '${spaceDesc}', '${neighborhoodDesc}' )`;
    connection.query(theQuery, (err, res) => {
      if (err) {
        console.log('Error in populating the listings table ', err);
      } else {
        console.log('Success in populating the listings table ', res);
      }
    });
  }
};

// to populate the listing_lists table
const populateListingsLists = () => {
  for (let i = 1; i <= 100; i += 1) {
    const theQuery = `INSERT INTO listings_lists (listing_id, list_id) VALUES (${i}, ${i})`;
    connection.query(theQuery, (err, res) => {
      if (err) {
        console.log('Error in populating the listings_list table ', err);
      } else {
        console.log('Success in populating the listings_list table ', res);
      }
    });
  }
};

// to populate the listing_photos table
// we want each listing to have 2 unique photos (1 to 200) and 13 random photos from indices 201 to 266
const populateListingPhotos = () => {
  const photoDescriptions = ['comfy bed', 'spacious room', 'where the cool ones stay', 'presidential suite', 'glamorous bed', 'fun every day', 'woofderful', 'miawjestic sight', 'mewtiful', 'gllamarous', 'whale-built', 'open air', 'cozy', 'brand new', 'vibrant'];
  let photoCount = 1;
  let heroCount = 1;
  let photoId = 0;
  let theQuery = '';
  let photoUrl = '';
  for (let i = 1; i <= 100; i += 1) {
    for (let x = 0; x < 15; x += 1) {
      const index = Math.floor(Math.random() * 15); // up to 14
      const description = photoDescriptions[index];

      if (x === 0) {
        photoUrl =  `https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/listings/hero${heroCount}.jpg`
        heroCount += 1;
        theQuery = `INSERT INTO listing_photos (photo_description, photo_url, photo_listing_id) VALUES ('${description}', '${photoUrl}', ${i})`;
      }
      else if (x === 1 || x === 2) {
        photoId = photoCount;
        photoCount += 1;
        photoUrl = `https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/listings/entry${photoId}.jpg`;
        theQuery = `INSERT INTO listing_photos (photo_description, photo_url, photo_listing_id) VALUES ('${description}', '${photoUrl}', ${i})`;
      } else {
        photoId = Math.floor(Math.random() * (266 - 200 + 1) + 200);
        photoUrl = `https://s3-us-west-1.amazonaws.com/hackreactor-fec-hero/listings/entry${photoId}.jpg`;
        theQuery = `INSERT INTO listing_photos (photo_description, photo_url, photo_listing_id) VALUES ('${description}', '${photoUrl}', ${i})`;
      }
       
      connection.query(theQuery, (err, res) => {
        if (err) {
          console.log('Error in populating the listings table ', err);
        } else {
          console.log('Success in populating the listings table ', res);
        }
      });
    }
  }
};


// Invoke functions to populate the database
populateUsers();
populateLists();
populateListings();
populateListingsLists();
populateListingPhotos();

}, 30000);





module.exports = connection;
