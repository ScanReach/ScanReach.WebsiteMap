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
 * @param {SalesPartner} partners
 */
async function renderSalesPartners(partners, mapboxMap) {
  let combinedGeoJson = {
    type: "FeatureCollection",
    features: [],
  };
  for (const partner of partners) {
    const response = await fetch(partner.geoJson);
    const partnerGeoJson = await response.json();
    partnerGeoJson.features[0].id = partner.id;
    combinedGeoJson.features.push(...partnerGeoJson.features);
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
let popupClicked = false;
map.on("load", async () => {
  await renderSalesPartners(salesPartners, map);
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
        0.5,
      ],
    },
  });
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
        0.5,
      ],
    },
  });

  // Add a popup to the map but don't show it yet.
  const partnerPopup = new mapboxgl.Popup();
  // Create a marker.
  const circleMarker = document.createElement("div");
  circleMarker.className = "scanReachMarker";
  const markerInstance = new mapboxgl.Marker(circleMarker);

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
        const hoveredPartner = salesPartners.find(
          (partner) => partner.id === countryId
        );
        if (hoveredPartner) {
          markerInstance.setLngLat(hoveredPartner.lngLat).addTo(map); // Add the marker to the map
          partnerPopup
            .setLngLat(hoveredPartner.lngLat)
            .setHTML(
              `
          <div class='popup-sales-partners'>
            <img class="partner-img" id="partner-img" src="${hoveredPartner.img}"></img>
            <h3 class="partner-name" id="partner-name">${hoveredPartner.name}</h3>
          </div>
          `
            )
            .addTo(map); // Add the popup to the map
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
        const clickedPartner = salesPartners.find(
          (partner) => partner.id === countryId
        );
        if (clickedPartner) {
          markerInstance.setLngLat(clickedPartner.lngLat).addTo(map); // Add the marker to the map
          partnerPopup
            .setLngLat(clickedPartner.lngLat)
            .setHTML(
              `
          <div class='popup-sales-partners'>
            <img class="partner-img" id="partner-img" src="${clickedPartner.img}"></img>
            <h3 class="partner-name" id="partner-name">${clickedPartner.name}</h3>
          </div>
          `
            )
            .addTo(map); // Add the popup to the map
        }
        map.setFeatureState(
          { source: "country", id: countryId },
          { click: true }
        );
      }
    }
    if (popupClicked && countryId !== null) {
      map.setFeatureState(
        { source: "country", id: countryId },
        { click: false }
      );
    }
    popupClicked = true;
  });

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["country-fills"],
    });

    // if no features from "country-fills" are clicked, remove popup and marker
    if (!features.length) {
      partnerPopup.remove();
      markerInstance.remove();
      popupClicked = false;
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
