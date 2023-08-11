mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhbnJlYWNoIiwiYSI6ImNrbGdqbHowZTF0cjQyd3M0OGN5MTY3NzEifQ.53kfrGXRQi_ZatxYMTwtNw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scanreach/cklgndh0z5f1q17t5y6ufehkd",
  center: [5.1243, 60.3571],
  zoom: 1.55,
});
let gemanyId = null;
const querinPos = [9.54435, 53.53786];
map.on("load", async () => {
  const response = await fetch("../../borders/germanySimplified.geojson");
  const germanySimplified = await response.json();
  germanySimplified.features[0].id = 1;
  // Add a data source containing GeoJSON data.
  map.addSource("germany", {
    type: "geojson",
    data: germanySimplified,
  });
  // Add a ScanReach Mint colour around the polygon. Opacity is set to 0.5 until hover
  map.addLayer({
    id: "germany-outline",
    type: "line",
    source: "germany",
    id: "germany-outline",
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
    id: "germany-click-outline",
    type: "line",
    source: "germany",
    id: "germany-click-outline",
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
  // Added a fill layer so the user can click anywhere on the polygon to trigger the popup.
  map.addLayer({
    id: "germany-fills",
    type: "fill",
    source: "germany",
    layout: {},
    paint: {
      "fill-color": "transparent",
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mouseenter", "germany-fills", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (gemanyId !== null) {
        map.setFeatureState(
          { source: "germany", id: gemanyId },
          { hover: false }
        );
      }
      gemanyId = e.features[0].id;
      map.setFeatureState({ source: "germany", id: gemanyId }, { hover: true });
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "germany-fills", () => {
    map.getCanvas().style.cursor = "grab";
    if (gemanyId !== null) {
      map.setFeatureState(
        { source: "germany", id: gemanyId },
        { hover: false }
      );
    }
    gemanyId = null;
  });

  // If the user clicked on one of the markers, get its information.
  map.on("click", "germany-fills", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["germany-fills"],
    });
    if (!features.length) {
      return;
    }
    const feature = features[0];
    if (e.features.length > 0) {
      if (gemanyId !== null) {
        map.setFeatureState(
          { source: "germany", id: gemanyId },
          { click: false }
        );
      }
    }
    gemanyId = features[0].id;
    map.setFeatureState({ source: "germany", id: gemanyId }, { click: true });

    const marker = new mapboxgl.Marker({ color: "#28d8c3", anchor: "top" })
      .setLngLat(querinPos)
      .addTo(map);

    // Add a popup to the map to display the information.
    const clickPopup = new mapboxgl.Popup()
      .setLngLat(querinPos)
      .setHTML(
        `
      <div class='popup-sales-partners'>
        <img class="partner-img" id="partner-img" src="../../images/salesPartners/querinLogo.png"></img>
        <h3 class="partner-name" id="partner-name">Ing.-Bueri Querin GmbH</h3>
      </div>
      `
      )
      .addTo(map);
  });
});
