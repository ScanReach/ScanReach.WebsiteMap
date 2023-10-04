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
    link: "https://www.visionmarine.com.br/",
    description:
      "Vision Marine Technologies, Inc. (Nasdaq: VMAR) is leading the innovation of the traditional boating market. Manufactures 100% electric boats producing zero emissions, keeping the natural environment com pletely clean. Producer of world's most powerful electric outboard engine, E-Motion 180E.",
  },
  {
    id: 9,
    name: "Juptiter Marine",
    area: "Middle East and India",
    img: "images/salesPartners/jupiterMarineLogo.png",
    lngLat: [42.3528328, 25.6242618], // Not the correct location but they are based in Florida USA and their area is Middle East and India which could confuse the user if we use the correct location.
    geoJson: "borders/middleEastAndIndiaSimplified.geojson",
    link: "http://jupitermarinegroup.com/",
    description:
      "Jupiter Marine International Holdings Inc designs, manufactures and markets sport fishing boats like 29 Forward Seating Center Console, 31 Open Center Console, 31 Cuddy Cabin and 31 Forward Seating Center Console. Geographically the business activities are carried out through Palmetto, Florida.",
  },
  {
    id: 10,
    name: "MHA Automation",
    area: "Malaysia",
    img: "images/salesPartners/mhaAutomationLogo.png",
    lngLat: [103.86493, 1.47746],
    geoJson: "borders/malaysiaSimplified.geojson",
    link: "https://www.mhaautomation.com/",
    description:
      "MHA AUTOMATION ENGINEERING SDN BHD. With over 20 years of experience in the industry, MHA Automation Engineering has established a strong reputation for delivering high-quality products and services to clients across a range of industries.",
  },
  {
    id: 11,
    name: "Marix Kabushiki Kaisha",
    area: "Japan",
    img: "images/salesPartners/marixLogo.png",
    lngLat: [139.75114, 36.66522], // Not sure if location is correct. When searching for the company it shows different locations on different websites.
    geoJson: "borders/japanSimplified.geojson",
    link: "https://marix.co.jp/",
    description:
      "Marix Kabushiki Kaisha has offered its engineering skill in the field of ship management. Ship building and factory plant operatioin since this company was established by a group of marine engineers in 1980.",
  },
  {
    id: 12,
    name: "Royal Van der leun",
    area: "Netherlands",
    img: "images/salesPartners/royalVanDerLeunLogo.png",
    lngLat: [4.80017, 51.8257],
    geoJson: "borders/netherlandsSimplified.geojson",
    link: "https://www.vanderleun.nl/",
    description:
      "Van der Leun works with 230 specialists worldwide on installation projects in the construction, dredging, offshore, and maritime industries. Our specialities are grouped into three divisions: Electrical Marine Systems, Electro Engineering and Metaalbewerking. Each division independently serves its own markets; together, they cooperate to form the strong and multifaceted foundation of Van der Leun. ",
  },
  {
    id: 13,
    name: "Digital Ocean Technologies",
    area: "Cyprus",
    img: "images/salesPartners/digitalOceanTechLogo.png",
    lngLat: [33.0415, 34.68044],
    geoJson: "borders/cyprusSimplified.geojson",
    link: "https://www.digitaloceantech.com/",
    description:
      "DOT is a technology company with a broad scope of services, maintenance inspections and sales of NAVCOM equipment. DOT was formed by professionals with extensive experience in the maritime industry and established a worldwide service network in order to provide cost-efficient and quality services to our customers.",
  },
];
