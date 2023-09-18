/**
 * @typedef {import("./repList").Representative} Representative
 */

/**
 * @type {Representative[]}
 */
const salesPartners = [
  {
    id: 1,
    name: "Bocvera Maritime",
    area: "Mexico",
    img: "./images/salesPartners/bocveraLogo.png",
    lngLat: [-96.11194, 19.15939],
    geoJson: "./borders/mexicoSimplified.geojson",
    link: "https://bocvera.com/",
    description:
      "Bocvera Maritime S.A. de C.V. is a Mexican company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Mexico.",
  },
  {
    id: 2,
    name: "Querin",
    area: "Germany",
    img: "./images/salesPartners/querinLogo.png",
    lngLat: [9.54435, 53.53786],
    geoJson: "./borders/germanySimplified.geojson",
    link: "https://www.querin.de/",
    description:
      "Querin GmbH is a German company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Germany.",
  },
  {
    id: 3,
    name: "DSolution",
    area: "Spain",
    img: "./images/salesPartners/dSolutionLogo.png",
    lngLat: [-3.70379, 40.41678], // Not the correct coordinates - The location is in panama. Which will only confuse the user
    geoJson: "./borders/spainSimplified.geojson",
    link: null, // Not the correct link
    description:
      "DSolution is a Spanish company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Spain.",
  },
  {
    id: 4,
    name: "JNK",
    area: "Indonesia",
    img: "./images/salesPartners/jnkLogo.png",
    lngLat: [106.89373, -6.15456],
    geoJson: "./borders/indonesiaSimplified.geojson",
    link: null, // Not the correct link
    description:
      "JNK is an Indonesian company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Indonesia.",
  },
  {
    id: 5,
    name: "Lyssos",
    area: "Greece",
    img: "./images/salesPartners/lyssosLogo.png",
    lngLat: [23.63549, 37.93688],
    geoJson: "./borders/greeceSimplified.geojson",
    link: "https://www.lyssos.com/",
    description:
      "Lyssos is a Greek company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Greece.",
  },
  {
    id: 6,
    name: "Seacoast Marine Electronics",
    area: "Canada",
    img: "./images/salesPartners/seacoastMarineLogo.png",
    lngLat: [-63.66494, 44.63718],
    geoJson: "./borders/canadaSimplified.geojson",
    link: "https://www.seacoastmarine.ca/",
    description:
      "Seacoast Marine Electronics is a Canadian company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Canada.",
  },
  {
    id: 7,
    name: "Technonaval",
    area: "USA",
    img: "./images/salesPartners/technonavalLogo.png",
    lngLat: [-80.40315, 25.65554],
    geoJson: "./borders/unitedStatesSimplified.geojson",
    link: "https://www.technonaval.com/",
    description:
      "Technonaval is a USA company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in USA.",
  },
  {
    id: 8,
    name: "Vision Marine Technologies",
    area: "Brazil",
    img: "./images/salesPartners/visionMarineLogo.png",
    lngLat: [-43.2673, -22.87791],
    geoJson: "./borders/brazilSimplified.geojson",
    link: "https://www.visionmarine.com.br//",
    description:
      "Vision Marine Technologies is a Brazilian company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry. They are a company that is committed to the environment and the development of the maritime sector in Brazil.",
  },
];
