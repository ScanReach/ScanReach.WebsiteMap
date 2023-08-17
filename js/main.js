/** @typedef {import(../repList.js).Representative} Representative */

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhbnJlYWNoIiwiYSI6ImNrbGdqbHowZTF0cjQyd3M0OGN5MTY3NzEifQ.53kfrGXRQi_ZatxYMTwtNw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scanreach/cklgndh0z5f1q17t5y6ufehkd",
  center: [5.1243, 60.3571],
  zoom: 2.4,
});
window.map = map; // For easier debugging

let repListContainer = document.getElementById(
  "representatives-list-container"
);
let repListPopupContainer = document.getElementById(
  "representatives-popup-container"
);

/**
 * Automatically change rendered data when the query param changes
 * The query param we read is `url?data=(representatives|salesPartners)`.
 * Change this query param to change rendering.
 */
window.addEventListener("change", async (e) => {
  await getQueryParamAndRender();
});

const listRadio = document.getElementById("select-list-view");
const mapRadio = document.getElementById("select-map-view");
const mapContainer = document.getElementById("map");
listRadio.addEventListener("change", () => {
  if (listRadio.checked) {
    repListContainer.style.display = "flex";
    mapContainer.style.display = "none";
    if (getQueryParamData() == "salesPartners") {
      repListContainer.innerHTML = renderSalesPartnerList(salesPartners);
    } else {
      repListContainer.innerHTML = renderRepresentativesList(representatives);
    }
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
  await getQueryParamAndRender();
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

        // FIXME: Render different popup based on output from getQueryParamData()

        const hoveredRep = representatives.find((rep) => rep.id === countryId);
        if (hoveredRep) {
          repListPopupContainer.style.display = "flex";
          repListPopupContainer.innerHTML = `
            <div class="representatives-container">
            <img id="representative-img" class="representative-img" alt="${hoveredRep.description}" src="${hoveredRep.img}"/>
              <div class='representative-info'>
                <h3 class="representative-name" id="representative-name">${hoveredRep.name}</h3>
                <div class="reprentative-contact-container">
                  <i class="email"></i>
                  <a href="mailto: ${hoveredRep.email}" class="representative-email">${hoveredRep.email}</a>
                </div>
                <div class="reprentative-contact-container">
                  <i class="phone"></i>
                  <a href="tel:${hoveredRep.phone}" class="representative-phone">${hoveredRep.phone}</a>
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
            <img id="representative-img" class="representative-img" alt="${clickedRep.description}" src="${clickedRep.img}"/>
              <div class='representative-info'>
                <h3 class="representative-name" id="representative-name">${clickedRep.name}</h3>
                <div class="reprentative-contact-container">
                  <i class="email"></i>
                  <a href="mailto: ${clickedRep.email}" class="representative-email">${clickedRep.email}</a>
                </div>
                <div class="reprentative-contact-container">
                  <i class="phone"></i>
                  <a href="tel:${clickedRep.phone}" class="representative-phone">${clickedRep.phone}</a>
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

    // if no features from "country-fills" are clicked, remove popup and marker
    if (!features.length) {
      repListPopupContainer.style.display = "none";
      return;
    }
    if (countryId !== null) {
      map.setFeatureState(
        { source: "country", id: countryId },
        { click: false }
      );
      countryId = null;
    }
  });
});

async function getQueryParamAndRender() {
  const defaultToRender = "representatives";
  const dataToRender = getQueryParamData();
  if (!dataToRender) {
    window.location.search = `?data=${defaultToRender}`;
    dataToRender = defaultToRender;
  }
  switch (dataToRender.toLowerCase()) {
    case "salespartners":
      console.debug("Rendering salesPartners");
      await renderRepresentativePolygons(salesPartners, map);
      break;
    case "representatives":
    default:
      console.debug("Rendering representatives");
      await renderRepresentativePolygons(representatives, map);
      break;
  }
}

/**
 * The query param we read is `url?data=(representatives|salesPartners)`.
 * Change this query param to change rendering.
 * @returns {"salesPartners" | "representatives""}
 */
function getQueryParamData() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("data");
}

/**
 * Renders all polygons to mapboxMap
 * @param {Representative[]} representatives
 */
async function renderRepresentativePolygons(representatives, mapboxMap) {
  if (!map.loaded()) {
    console.debug("Map has not loaded yet, I will try again in 100ms");
    await new Promise((res) => setTimeout(renderRepresentativePolygons, 100));
    return;
  }
  let combinedGeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const rep of representatives) {
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

/**
 *
 * @param {Representative} representatives
 * @returns String ready to be inserted to element.innerHTML
 */
function renderRepresentativesList(representatives) {
  let content = "";

  representatives.forEach((rep) => {
    content += `
      <h3 class="representative-area">${rep.area}</h3>
      <div class="representatives-container">
      <img id="representative-img" class="representative-img" alt="${rep.description}" src="${rep.img}"/>
        <div class='representative-info'>
          <h3 class="representative-name" id="representative-name">${rep.name}</h3>
          <div class="reprentative-contact-container">
            <i class="email"></i>
            <a href="mailto: ${rep.email}" class="representative-email">${rep.email}</a>
          </div>
          <div class="reprentative-contact-container">
            <i class="phone"></i>
            <a href="tel:${rep.phone}" class="representative-phone">${rep.phone}</a>
          </div>
        </div>
    </div>
    `;
  });
  return content;
}

/**
 *
 * @param {Representative} salesPartners
 * @returns String ready to be inserted to element.innerHTML
 */
function renderSalesPartnerList(salesPartners) {
  let content = "";

  salesPartners.forEach((partner) => {
    content += `
    <h3 class="representative-area" >${partner.area}</h3>
    <a href="${partner.link}">
    <div class="salespartner-img-container">
        <img id="salespartner-img" class="salespartner-img" alt="${partner.description}" src="${partner.img}"/>
    </div>
    </a>  
    `;
  });
  return content;
}
