/**
 * @type {Representatives[]}
 */
const representatives = [
  {
    id: 1,
    name: "Olivia Eikemo",
    area: "Scandics",
    img: "../../images/representatives/Olivia-Eikemo.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/scandicsSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Olivia Eikemo",
  },
  {
    id: 2,
    name: "Trond Liaboe",
    area: "North America",
    img: "../../images/representatives/Trond-Liaboe.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/northAmericaSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Trond Liaboe",
  },
  {
    id: 3,
    name: "Dan Slater",
    area: "Mediterranean and UK",
    img: "../../images/representatives/Dan-Slater.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/mediterraneanAndUkSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Dan Slater",
  },
  {
    id: 4,
    name: "Paul Robbe",
    area: "South America, Iberia, Benelux, Germany, Poland",
    img: "../../images/representatives/Paul-Robbe.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson:
      "../../borders/southAmericaIberiaBeneluxGermanyPolandSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Paul Robbe",
  },
  {
    id: 5,
    name: "Sven-Eric Brooks",
    area: "Africa, ROW",
    img: "../../images/representatives/Sven-Eric-Brooks.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/africaAndRowSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Sven-Eric-Brooks",
  },
  {
    id: 8,
    name: "Michael Hendricks",
    area: "APAC",
    img: "../../images/representatives/Michael-Hendricks.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/APACSimplified.geojson", // Not the coorect file
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Michael Hendricks",
  },
  {
    id: 7,
    name: "Milind J. Karkhanis",
    area: "Middle East and India",
    img: "../../images/representatives/Milind-J-Karkhanis.png",
    lngLat: [5.1215, 60.36549], // remove when representative.js file is modified
    geoJson: "../../borders/middleEastAndIndiaSimplified.geojson",
    phone: "+47 900 00 000", // Add correct phone number
    email: "sales@scanreach.com",
    description: "image of Milind J. Karkhanis",
  },
];

/**
 * @typedef {Object} representatives
 * @property {number} id - The id of the representative.
 * @property {string} name - The name of the representative.
 * @property {string} area - The area of the representative.
 * @property {string} img - The image of the representative.
 * @property {number[]} lngLat - The coordinates of the representative.
 * @property {string} geoJson - The geoJson of the representative.
 * @property {string} phone - The phone number of the representative.
 * @property {string} email - The email of the representative.
 * @property {string} description - The description of the representative.
 */
