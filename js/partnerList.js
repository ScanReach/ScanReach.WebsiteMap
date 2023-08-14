/**
 * @type {SalesPartner[]}
 */
const salesPartners = [
  {
    id: 1,
    name: "Bocvera Maritime",
    area: "Mexico",
    img: "../../images/salesPartners/bocveraLogo.png",
    lngLat: [-96.11194, 19.15939],
    geoJson: "../../borders/mexicoSimplified.geojson",
    link: "https://bocvera.com/",
    description:
      "Bocvera Maritime S.A. de C.V. is a Mexican company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Mexico.",
  },
  {
    id: 2,
    name: "Querin",
    area: "Germany",
    img: "../../images/salesPartners/querinLogo.png",
    lngLat: [9.54435, 53.53786],
    geoJson: "../../borders/germanySimplified.geojson",
    link: "https://www.querin.de/",
    description:
      "Querin GmbH is a German company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Germany.",
  },
];

/**
 * @typedef {Object} SalesPartner
 * @property {number} id - The id of the sales partner.
 * @property {string} name - The name of the sales partner.
 * @property {string} area - The area of the sales partner.
 * @property {string} img - The path to the image of the sales partner.
 * @property {number[]} lngLat - The longitude and latitude of the sales partner.
 * @property {string} geoJson - The path to the geoJson file of the sales partner.
 * @property {string} link - The link to the sales partner's website.
 * @property {string} description - The description of the sales partner.
 */
