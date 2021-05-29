
// Mapbox js for the contact page

mapboxgl.accessToken = 'pk.eyJ1IjoicGFjaWVrZmx5IiwiYSI6ImNrbms2ZW54cjA3eXEycW54cTY5Y29xOWEifQ.giXUI96ja1Bv1iLe2XOcVQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [19.020867833669737, 49.798330017256404], // starting position [lng, lat]
    zoom: 9, // starting zoom
    attributionControl: false
});

new mapboxgl.Marker({ color: 'pink', rotation: 0 })
    .setLngLat([19.020867833669737, 49.798330017256404])
    .addTo(map);

