/**
 * @type {Representative[]}
 */
const representatives = [
  {
    id: 1,
    name: "Olivia Eikemo",
    area: "Scandics",
    img: "./ScanReach.WebsiteMap/images/representatives/Olivia-Eikemo.png",
    geoJson: "/ScanReach.WebsiteMap/borders/scandicsSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Olivia Eikemo",
  },
  {
    id: 2,
    name: "Trond Liaboe",
    area: "North America",
    img: "ScanReach.WebsiteMap/images/representatives/Trond-Liaboe.png",
    geoJson: "ScanReach.WebsiteMap/borders/northAmericaSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Trond Liaboe",
  },
  {
    id: 3,
    name: "Dan Slater",
    area: "Mediterranean and UK",
    img: "../../images/representatives/Dan-Slater.png",
    geoJson: "./../../borders/mediterraneanAndUkSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Dan Slater",
  },
  {
    id: 4,
    name: "Paul Robbe",
    area: "South America, Iberia, Benelux, Germany, Poland",
    img: "/../../images/representatives/Paul-Robbe.png",
    geoJson:
      "ScanReach.WebsiteMap/borders/southAmericaIberiaBeneluxGermanyPolandSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Paul Robbe",
  },
  {
    id: 5,
    name: "Sven-Eric Brooks",
    area: "Africa, ROW",
    img: "ScanReach.WebsiteMap/images/representatives/Sven-Eric-Brooks.png",
    geoJson: "ScanReach.WebsiteMap/borders/africaAndRowSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Sven-Eric-Brooks",
  },
  {
    id: 8,
    name: "Michael Hendricks",
    area: "APAC",
    img: "ScanReach.WebsiteMap/images/representatives/Michael-Hendricks.png",
    geoJson: "ScanReach.WebsiteMap/borders/APACSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Michael Hendricks",
  },
  {
    id: 7,
    name: "Milind J. Karkhanis",
    area: "Middle East and India",
    img: "ScanReach.WebsiteMap/images/representatives/Milind-J-Karkhanis.png",
    geoJson:
      "ScanReach.WebsiteMap/borders/middleEastAndIndiaSimplified.geojson",
    phone: "+47 414 96 500",
    email: "sales@scanreach.com",
    description: "image of Milind J. Karkhanis",
  },
];

/**
 * @typedef {Object} Representative
 * @property {number} id - The id of the representative.
 * @property {string} name - The name of the representative.
 * @property {string} area - The area of the representative.
 * @property {string} img - The image of the representative.
 * @property {string} geoJson - The geoJson of the representative.
 * @property {number[] | null | undefined} lngLat - The longitude and latitude of the sales partner. Only used by salesPartners
 * @property {string[] | null | undefined} phone - The phone number of the representative.
 * @property {string[] | null | undefined} email - The email of the representative.
 * @property {string | null | undefined} link - The link to the sales partner's website.
 * @property {string} description - The description of the representative.
 */
