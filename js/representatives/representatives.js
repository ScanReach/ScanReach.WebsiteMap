mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhbnJlYWNoIiwiYSI6ImNrbGdqbHowZTF0cjQyd3M0OGN5MTY3NzEifQ.53kfrGXRQi_ZatxYMTwtNw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scanreach/cklgndh0z5f1q17t5y6ufehkd",
  center: [5.1243, 60.3571],
  zoom: 2.4,
});

/**
 *
 * @param {Representatives} reps
 */
// gets the geoJson from the reps and combines them into one geoJson
async function renderRepresentatives(reps, mapboxMap) {
  let combinedGeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const rep of reps) {
    const response = await fetch(rep.geoJson);
    const repGeoJson = await response.json();
    repGeoJson.features.forEach((feature) => {
      feature.id = rep.id; // set the ID to the rep id
    });
    combinedGeoJson.features.push(...repGeoJson.features);
  }
  let polygonSource = mapboxMap.getSource("country");
  if (!polygonSource) {
    // Add a data source containing GeoJSON data.
    mapboxMap.addSource("country", {
      type: "geojson",
      data: combinedGeoJson,
    });
  } else {
    polygonSource.setData(combinedGeoJson);
  }
}

let countryId = null;

function renderRepresentativesList(representatives) {
  let content = "";

  representatives.forEach((rep) => {
    content += `
    <h3 class="resposibility-area">${rep.area}</h3>
    <div class="representatives-container">
    <img class="popup-img" alt="${rep.description}" src="${rep.img}"/>
      <div class="popup-info">
        <h3 class="area-owner">${rep.name}</h3>
        <div class="popup-contact-container">
          <i class="email"></i>
          <a href="mailto: ${rep.email}" class="popup-contact-info">${rep.email}</a>
        </div>
        <div class="popup-contact-container">
          <i class="phone"></i>
          <a href="tel:${rep.phone}" class="popup-contact-info">${rep.phone}</a>
        </div>
      </div>
  </div>
  `;
  });
  return content;
}

let repListContainer = document.getElementById("list-container");
let mapContainer = document.getElementById("map");
repListContainer.innerHTML = renderRepresentativesList(representatives);

let repListPopupContainer = document.getElementById(
  "representatives-popup-container"
);

const listRadio = document.getElementById("select-list-view");
const mapRadio = document.getElementById("select-map-view");
listRadio.addEventListener("change", () => {
  if (listRadio.checked) {
    repListContainer.style.display = "flex";
    mapContainer.style.display = "none";
  }
});

mapRadio.addEventListener("change", () => {
  if (mapRadio.checked) {
    repListContainer.style.display = "none";
    mapContainer.style.display = "block";
  }
});

// load layers and render sales reps
map.on("load", async () => {
  await renderRepresentatives(representatives, map);
  // Added a fill layer so the user can click anywhere on the polygon to trigger the popup.
  map.addLayer({
    id: "country-fills",
    type: "fill",
    source: "country",
    layout: {},
    paint: {
      "fill-color": "transparent",
    },
  });
  // Add a ScanReach Mint colour around the polygon. Opacity is set to 0.5 until hover
  map.addLayer({
    id: "country-hover-outline",
    type: "line",
    source: "country",
    layout: {},
    paint: {
      "line-color": "#28D8C3",
      "line-width": 2,
      "line-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.3,
      ],
    },
  });
  // Add a ScanReach Mint colour around the polygon. Opacity is set to 0.5 until click
  map.addLayer({
    id: "country-click-outline",
    type: "line",
    source: "country",
    layout: {},
    paint: {
      "line-color": "#28D8C3",
      "line-width": 2,
      "line-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        1,
        0.3,
      ],
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mouseenter", "country-fills", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      for (const feature of e.features) {
        countryId = feature.id;
        if (countryId !== null) {
          map.setFeatureState(
            { source: "country", id: countryId },
            { hover: false }
          );
        }
        const hoveredRep = representatives.find((rep) => rep.id === countryId);
        if (hoveredRep) {
          repListPopupContainer.style.display = "flex";
          repListPopupContainer.innerHTML = `
          <div class="representatives-container">
          <img class="popup-img" alt="${hoveredRep.description}" src="${hoveredRep.img}"/>
            <div class='popup-info'>
              <h3 class="area-owner">${hoveredRep.name}</h3>
              <div class="popup-contact-container">
                <i class="email"></i>
                <a href="mailto: ${hoveredRep.email}" class="popup-contact-info">${hoveredRep.email}</a>
              </div>
              <div class="popup-contact-container">
                <i class="phone"></i>
                <a href="tel:${hoveredRep.phone}" class="popup-contact-info">${hoveredRep.phone}</a>
              </div>
            </div>
        </div>
          `;
        }
        map.setFeatureState(
          { source: "country", id: countryId },
          { hover: true }
        );
      }
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "country-fills", () => {
    map.getCanvas().style.cursor = "";
    if (countryId !== null) {
      map.setFeatureState(
        { source: "country", id: countryId },
        { hover: false }
      );
      repListPopupContainer.style.display = "none";
    }
    countryId = null;
  });

  // If the user clicked on one of the markers, get its information.
  map.on("click", "country-fills", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["country-fills"],
    });
    if (e.features.length > 0) {
      for (const feature of e.features) {
        countryId = feature.id;
        if (countryId !== null) {
          map.setFeatureState(
            { source: "country", id: countryId },
            { click: false }
          );
        }
        const clickedRep = representatives.find((rep) => rep.id === countryId);
        if (clickedRep) {
          repListPopupContainer.style.display = "flex";
          repListPopupContainer.innerHTML = `
          <div class="representatives-container">
          <img class="popup-img" alt="${clickedRep.description}" src="${clickedRep.img}"/>
            <div class='popup-info'>
              <h3 class="area-owner">${clickedRep.name}</h3>
              <div class="popup-contact-container">
                <i class="email"></i>
                <a href="mailto: ${clickedRep.email}" class="popup-contact-info">${clickedRep.email}</a>
              </div>
              <div class="popup-contact-container">
                <i class="phone"></i>
                <a href="tel:${clickedRep.phone}" class="popup-contact-info">${clickedRep.phone}</a>
              </div>
            </div>
        </div>
          `;
        }
        map.setFeatureState(
          { source: "country", id: countryId },
          { click: true }
        );
      }
    }
  });

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["country-fills"],
    });

    // if no features from "country-fills" are clicked, remove popup
    if (!features.length) {
      repListPopupContainer.style.display = "none";
      return;
    }
    if (countryId !== null) {
      console.log("Resetting the click state for country", countryId);
      map.setFeatureState(
        { source: "country", id: countryId },
        { click: false }
      );
      countryId = null;
    }
    return;
  });
});
