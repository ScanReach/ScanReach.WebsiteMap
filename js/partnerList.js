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
    img: "images/salesPartners/bocveraLogo.png",
    lngLat: [-96.11194, 19.15939],
    geoJson: "borders/mexicoSimplified.geojson",
    link: "https://bocvera.com/",
    description:
      "Bocvera Maritime SA de CV is a Maritime Service Provider, founded in 2012, located in Veracruz, Mexico",
  },
  {
    id: 2,
    name: "Querin",
    area: "Germany",
    img: "images/salesPartners/querinLogo.png",
    lngLat: [9.54435, 53.53786],
    geoJson: "borders/germanySimplified.geojson",
    link: "https://www.querin.de/",
    description:
      "Ing.-Buero Querin GmbH - Your professional Partner for technical and nautical Equipment!",
  },
  {
    id: 3,
    name: "DSolution",
    area: "Spain",
    img: "images/salesPartners/dSolutionLogo.png",
    lngLat: [-3.70379, 40.41678], // Not the correct coordinates - The location is in panama. Which will only confuse the user.
    geoJson: "borders/spainSimplified.geojson",
    link: null, // Has no website
    description:
      "DSolution is a Spanish company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry.",
  },
  {
    id: 4,
    name: "JNK",
    area: "Indonesia",
    img: "images/salesPartners/jnkLogo.png",
    lngLat: [106.89373, -6.15456],
    geoJson: "borders/indonesiaSimplified.geojson",
    link: null, // Website does not work
    description:
      "JNK is an Indonesian company that provides services in the maritime sector, with a focus on the commercialization of products and services for the maritime industry.",
  },
  {
    id: 5,
    name: "Lyssos",
    area: "Greece",
    img: "images/salesPartners/lyssosLogo.png",
    lngLat: [23.63549, 37.93688],
    geoJson: "borders/greeceSimplified.geojson",
    link: "https://www.lyssos.com/",
    description:
      "Lyssos Enterprises has a wide and more than 30 years' accredited experience, in providing versatile solutions to Marine & Offshore, Industrial, Environmental and Defense & Security sectors.",
  },
  {
    id: 6,
    name: "Seacoast Marine Electronics",
    area: "Canada",
    img: "images/salesPartners/seacoastMarineLogo.png",
    lngLat: [-63.66494, 44.63718],
    geoJson: "borders/canadaSimplified.geojson",
    link: "https://www.seacoastmarine.ca/",
    description:
      "Seacoast is a leading provider of marine satcom, I(o)T solutions, crew safety and Com/nav equipment. We offer a comprehensive range of digital communications tools, and carry the latest equipment from brand name suppliers.",
  },
  {
    id: 7,
    name: "Technonaval",
    area: "USA",
    img: "images/salesPartners/technonavalLogo.png",
    lngLat: [-80.40315, 25.65554],
    geoJson: "borders/unitedStatesSimplified.geojson",
    link: "https://www.technonaval.com/",
    description:
      "Technonaval is a marine service provider partnering with leading companies providing outstanding technical competent and reliable solutions.",
  },
  {
    id: 8,
    name: "Vision Marine Technologies",
    area: "Brazil",
    img: "images/salesPartners/visionMarineLogo.png",
    lngLat: [-43.2673, -22.87791],
    geoJson: "borders/brazilSimplified.geojson",
    link: "https://www.visionmarine.com.br//",
    description:
      "Vision Marine Technologies, Inc. (Nasdaq: VMAR) is leading the innovation of the traditional boating market. Manufactures 100% electric boats producing zero emissions, keeping the natural environment com pletely clean. Producer of world's most powerful electric outboard engine, E-Motion 180E.",
  },
];
