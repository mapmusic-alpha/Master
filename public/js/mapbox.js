

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

// map.on('load', () => {
//     map.addSource('places', {
//         'type': 'geojson',
//         'data': {
//             'type': 'FeatureCollection',
//             'features': [
//                 {
//                     'type': 'feature',
//                     'properties': {
//                         'description': 'Famous club in the center of Berlin',
//                         'name': 'Tresor',
//                         'type': 'Club',

//                     },
//                     'geometry': {
//                         'type': 'Point',
//                         'coordinates': [13.4430, 52.5111]
//                     }
//                 },

//             ]
//         }
//     });

const events = [

    {
        'name': 'party1',
        location: 'berghain',
        cost: 5
    },
    {
        'name': 'party2',
        location: 'tresor',
        cost: 10
    },
    {
        name: 'party2',
        location: 'renate',
        cost: 15
    },

]


map.on('load', () => {

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'feature',
                    'properties': {

                        'name': events[0].name

                    },
                    'geometry': {

                        'type': 'Point',
                        'coordinates': [13.4430, 52.5111]
                    }
                },
                {
                    'type': 'feature',
                    'properties': {

                        'name': events[1].name
                    },
                    'geometry': {

                        'type': 'Point',
                        'coordinates': [13.5617, 52.5002]
                    }
                },

            ]
        }
    });


    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'circle',
        'source': 'places',
        'paint': {
            'circle-color': '#4264fb',
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






