
axios.get("mongodb+srv://mapmusic-admin:T33lo3ff3l@cluster0.bknjb.mongodb.net/map-music")
    .then(response => {
    })
    .catch(error => console.log(error))




mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyYW5ib3lsZSIsImEiOiJja3RlNTYyNW0ybHYwMnZqcDFydHF6ZGY4In0.jDVDbfsctFgWo2l3jRFnww'
const berlinCoords = [13.404954, 52.520008]
const mapBounds = [13.404954, 52.520008]

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kiranboyle/cktifo8rp658g17pp4mlnw554',
    center: berlinCoords,
    zoom: 12,
    // maxBounds: mapBounds
})

const nav = new mapboxgl.NavigationControl()


const events = [{
    name: 'Cool party1',
    date: 12 - 01 - 02,
    cost: 5,
    genre: 'Techno',

    location: {

        coordinates: [13.4430, 52.5111]

    },

},
{
    name: 'Cool party2',
    date: 12 - 01 - 03,
    cost: 10,
    genre: 'Techno',

    location: {

        coordinates: [13.5617, 52.5002]

    },

},
{
    name: 'Cool party2',
    date: 12 - 01 - 03,
    cost: 10,
    genre: 'Techno',

    location: {

        coordinates: [13.4652, 52.4974]

    },

},
]

const features = []

// Event.find().populate('location')
//     .then(events => {

//         console.log(events)

//     })
//     .catch(err => console.log(err))

events.forEach(event => {

    const feature = {
        'type': 'feature',

        'properties': {
            'name': event.name
        },

        'geometry': {
            'type': 'Point',
            'coordinates': event.location.coordinates
        }
    }

    features.push(feature)
})


console.log(features)

// mapbox config below


map.on('load', () => {

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    });


    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': '#e60026',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        // const coordinates = e.features[0].geometry.coordinates.slice();
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description
        const name = e.features[0].properties.name
        console.log(name)
        const location = e.features[0].name
        console.log(location)

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(`<h3>${name}</h3> <br>${description} <br> ${location}`).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});


map.addControl(nav, 'top-left')






