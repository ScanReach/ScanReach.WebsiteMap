mapboxgl.accessToken =
  "pk.eyJ1Ijoic2NhbnJlYWNoIiwiYSI6ImNrbGdqbHowZTF0cjQyd3M0OGN5MTY3NzEifQ.53kfrGXRQi_ZatxYMTwtNw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scanreach/cklgndh0z5f1q17t5y6ufehkd",
  center: [5.1243, 60.3571],
  zoom: 1.55,
});
let mexicoId = null;
const bocveraPos = [-96.11194, 19.15939];
map.on("load", async () => {
  const response = await fetch("../../borders/mexicoSimplified.geojson");
  const mexicoSimplified = await response.json();
  mexicoSimplified.features[0].id = 1;
  // Add a data source containing GeoJSON data.
  map.addSource("mexico", {
    type: "geojson",
    data: mexicoSimplified,
  });
  // Add a ScanReach Mint colour around the polygon. Opacity is set to 0.5 until hover or click.
  map.addLayer({
    id: "mexico-outline",
    type: "line",
    source: "mexico",
    id: "mexico-outline",
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
  // Added a fill layer so the user can click anywhere on the polygon to trigger the popup.
  map.addLayer({
    id: "mexico-fills",
    type: "fill",
    source: "mexico",
    layout: {},
    paint: {
      "fill-color": "transparent",
    },
  });

  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on("mouseenter", "mexico-fills", (e) => {
    map.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (mexicoId !== null) {
        map.setFeatureState(
          { source: "mexico", id: mexicoId },
          { hover: false }
        );
      }
      mexicoId = e.features[0].id;
      map.setFeatureState({ source: "mexico", id: mexicoId }, { hover: true });
    }
  });

  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on("mouseleave", "mexico-fills", () => {
    map.getCanvas().style.cursor = "grab";
    if (mexicoId !== null) {
      map.setFeatureState({ source: "mexico", id: mexicoId }, { hover: false });
    }
    mexicoId = null;
  });

  // If the user clicked on one of the markers, get its information.
  map.on("click", "mexico-fills", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["mexico-fills"],
    });
    if (!features.length) {
      return;
    }
    const feature = features[0];
    if (e.features.length > 0) {
      if (mexicoId !== null) {
        map.setFeatureState(
          { source: "mexico", id: mexicoId },
          { hover: false }
        );
      }
    }
    mexicoId = features[0].id;
    map.setFeatureState({ source: "mexico", id: mexicoId }, { click: true });

    const marker = new mapboxgl.Marker({ color: "#28d8c3", anchor: "top" })
      .setLngLat(bocveraPos)
      .addTo(map);

    // Add a popup to the map to display the information.
    const clickPopup = new mapboxgl.Popup()
      .setLngLat(bocveraPos)
      .setHTML(
        `
      <div class='popup-sales-partners'>
        <img class="partner-img" id="partner-img" src="../../images/salesPartners/bocveraLogo.png"></img>
        <h3 class="partner-name" id="partner-name">Bocvera Maritime S.A. de C.V</h3>
      </div>
      `
      )
      .addTo(map);
  });
});
