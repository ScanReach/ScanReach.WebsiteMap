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

let repListContainer = document.getElementById("list-container");
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
    if (getQueryParamData() == "salespartners") {
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

  // Add a popup to the map but don't show it yet.
  const partnerPopup = new mapboxgl.Popup();
  // Create a marker.
  const circleMarker = document.createElement("div");
  circleMarker.className = "scanReachMarker";
  const markerInstance = new mapboxgl.Marker(circleMarker);

  let clickedCountryId = null;
  let previouslyHoveredCountryId = null;
  let isCountryClicked = false;

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mouseenter", "country-fills", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (previouslyHoveredCountryId) {
        // Check if there is a previously hovered country.
        map.setFeatureState(
          { source: "country", id: previouslyHoveredCountryId },
          { hover: false }
        );
      }
      for (const feature of e.features) {
        countryId = feature.id;
        if (countryId !== null) {
          map.setFeatureState(
            { source: "country", id: countryId },
            { hover: false }
          );
        }
        if (clickedCountryId !== null && countryId !== clickedCountryId) {
          map.setFeatureState(
            { source: "country", id: clickedCountryId },
            { hover: false }
          );
        }
        if (getQueryParamData() == "salespartners") {
          const hoveredPartner = salesPartners.find(
            (partner) => partner.id === countryId
          );
          if (hoveredPartner && hoveredPartner.lngLat) {
            markerInstance.setLngLat(hoveredPartner.lngLat).addTo(map); // Add the marker to the map
            partnerPopup
              .setLngLat(hoveredPartner.lngLat)
              .setHTML(
                `
                ${
                  hoveredPartner.link
                    ? '<a target="_blank" href="' + hoveredPartner.link + '">'
                    : ""
                }
                  <div class='popup-sales-partners'>
                    <img class="popup-img" alt="${
                      hoveredPartner.description
                    }" src="${hoveredPartner.img}"></img>
                    <div class="popup-info">
                      <h3 class="area-owner">${hoveredPartner.name}</h3>
                    </div>
                  </div>
                  ${hoveredPartner.link ? "</a>" : ""}
                `
              )
              .addTo(map); // Add the popup to the map
          }
        } else {
          const hoveredRep = representatives.find(
            (rep) => rep.id === countryId
          );
          if (hoveredRep) {
            repListPopupContainer.style.display = "flex";
            repListPopupContainer.innerHTML = `
            <div class="representatives-container">
            <img class="popup-img" alt="${hoveredRep.description}" src="${hoveredRep.img}"/>
              <div class='popup-info'>
                <h3 class="popup-name">${hoveredRep.name}</h3>
                <div class="popup-contact-container">
                <a href="mailto: ${hoveredRep.email}" class="popup-contact-info">
                <i class="fas fa-envelope"></i>
                  <p>${hoveredRep.email}</p>
                  </a>
                </div>
                <div class="popup-contact-container">
                <a href="tel:${hoveredRep.phone}" class="popup-contact-info">
                <i class="fas fa-phone-alt"></i>
                  <p>${hoveredRep.phone}</p>
                  </a>
                </div>
              </div>
          </div>
                `;
          }
        }
        map.setFeatureState(
          { source: "country", id: countryId },
          { hover: true }
        );
        previouslyHoveredCountryId = countryId; // Store this as the previously hovered country.
      }
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "country-fills", () => {
    map.getCanvas().style.cursor = "";
    if (countryId !== null && !isCountryClicked) {
      if (getQueryParamData() == "salespartners") {
        partnerPopup.remove();
        markerInstance.remove();
      } else {
        repListPopupContainer.style.display = "none";
      }
    }
    countryId = null;
  });

  // If the user clicked on one of the state-fill layers, get its information.
  map.on("click", "country-fills", (e) => {
    if (e.features.length > 0) {
      for (const feature of e.features) {
        clickedFeatureId = feature.id;
        if (clickedCountryId !== null) {
          map.setFeatureState(
            { source: "country", id: clickedCountryId },
            { hover: false }
          );
        }
        if (getQueryParamData() == "salespartners") {
          const clickedPartner = salesPartners.find(
            (partner) => partner.id === countryId
          );
          if (clickedPartner) {
            markerInstance.setLngLat(clickedPartner.lngLat).addTo(map); // Add the marker to the map
            partnerPopup
              .setLngLat(clickedPartner.lngLat)
              .setHTML(
                `
                  ${
                    clickedPartner.link
                      ? '<a target="_blank" href="' + clickedPartner.link + '">'
                      : ""
                  }
                    <div class='popup-sales-partners'>
                      <img class="popup-img" alt="${
                        clickedPartner.description
                      }" src="${clickedPartner.img}"></img>
                      <div class="popup-info">
                        <h3 class="area-owner">${clickedPartner.name}</h3>
                      </div>
                    </div>
                  ${clickedPartner.link ? "</a>" : ""}
                  `
              )
              .addTo(map); // Add the popup to the map
          }
        } else {
          const clickedRep = representatives.find(
            (rep) => rep.id === countryId
          );
          if (clickedRep) {
            repListPopupContainer.style.display = "flex";
            repListPopupContainer.innerHTML = `
                  <div class="representatives-container">
                  <img class="popup-img" alt="${clickedRep.description}" src="${clickedRep.img}"/>
                    <div class='popup-info'>
                      <h3 class="popup-name">${clickedRep.name}</h3>
                      <div class="popup-contact-container">
                      <a href="mailto: ${clickedRep.email}" class="popup-contact-info">
                      <i class="fas fa-envelope"></i>
                        <p>${clickedRep.email}</p>
                        </a>
                      </div>
                      <div class="popup-contact-container">
                      <a href="tel:${clickedRep.phone}" class="popup-contact-info">
                      <i class="fas fa-phone-alt"></i>
                        <p>${clickedRep.phone}</p>
                        </a>
                      </div>
                    </div>
                </div>
                  `;
          }
        }
        map.setFeatureState(
          { source: "country", id: clickedFeatureId },
          { hover: true }
        );
      }
      clickedCountryId = clickedFeatureId; // Store this as the clicked country.
      isCountryClicked = true;
    }
  });

  // if no features from "country-fills" are clicked, remove popup and marker
  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["country-fills"],
    });
    if (!features.length) {
      // If clicked outside of any country, remove hover state for all countries
      const allCountries = map.queryRenderedFeatures({
        layers: ["country-fills"],
      });
      allCountries.forEach((feature) => {
        map.setFeatureState(
          { source: "country", id: feature.id },
          { hover: false }
        );
      });

      if (getQueryParamData() == "salespartners") {
        partnerPopup.remove();
        markerInstance.remove();
      } else {
        repListPopupContainer.style.display = "none";
      }
      return;
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
      await renderRepresentativePolygons(salesPartners, map);
      break;
    case "representatives":
    default:
      await renderRepresentativePolygons(representatives, map);
      break;
  }
}

/**
 * The query param we read is `url?data=(representatives|salesPartners)`.
 * Change this query param to change rendering.
 * @returns {"salesPartners" | "representatives"}
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
    // Skip entries without geoJson data (like global partners)
    if (!rep.geoJson || rep.geoJson.trim() === "") {
      continue;
    }

    try {
      const response = await fetch(rep.geoJson);
      if (!response.ok) {
        console.warn(
          `Failed to fetch GeoJSON for ${rep.name}: ${response.status}`
        );
        continue;
      }
      const repGeoJson = await response.json();
      repGeoJson.features.forEach((feature) => {
        feature.id = rep.id; // set the ID to the rep id
      });
      combinedGeoJson.features.push(...repGeoJson.features);
    } catch (error) {
      console.warn(`Error loading GeoJSON for ${rep.name}:`, error);
    }
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
    <h3 class="resposibility-area">${rep.area}</h3>
    <div class="representatives-container">
    <img class="popup-img" alt="${rep.description}" src="${rep.img}"/>
      <div class="popup-info">
        <h3 class="area-owner">${rep.name}</h3>
        <div class="popup-contact-container">
        <i class="fas fa-envelope"></i>
          <a href="mailto: ${rep.email}" class="popup-contact-info">${rep.email}</a>
        </div>
        <div class="popup-contact-container">
        <i class="fas fa-phone-alt"></i>
          <a href="tel:${rep.phone}" class="popup-contact-info">${rep.phone}</a>
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
    <h3 class="resposibility-area" >${partner.area}</h3>
    ${partner.link ? '<a target="_blank" href="' + partner.link + '">' : ""}
    <div class="salespartner-img-container">
        <img id="salespartner-img" class="salespartner-img" alt="${
          partner.description
        }" src="${partner.img}"/>
    </div>
    ${partner.link ? "</a>" : ""}
    `;
  });
  return content;
}
