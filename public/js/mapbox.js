const features = []
axios.get("/api/events")
    .then(events => {

        let allEvents = events.data


        console.log(allEvents)
        allEvents.forEach(event => {

            const feature = {
                'type': 'feature',

                'properties': {
                    'name': event.name,
                    'cost': event.cost,
                    'location': event.location.name,
                    'openingHours': event.openingHours,
                    'date': event.date

                },

                'geometry': {
                    'type': 'Point',
                    'coordinates': event.location.coordinates
                }
            }

            features.push(feature)
        })

    })


console.log(features)




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
            'circle-stroke-color': '#000000'
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'mapbox-popup',
    });

    map.on('mouseenter', 'places', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        // const coordinates = e.features[0].geometry.coordinates.slice();
        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.name
        console.log(name)
        const location = e.features[0].properties.location
        console.log(location)
        const cost = e.features[0].properties.cost

        const date = e.features[0].properties.date

        const openingHours = e.features[0].properties.openingHours

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(`<h4>${name}</h4>Cost: ${cost} € <br>Event Location: ${location} <br>Date: ${date} <br>Opening Hours: ${openingHours}`).addTo(map);
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});


map.addControl(nav, 'top-left')


