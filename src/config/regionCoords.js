/**
 * @variables {object} coordinates HashMap of Map Marker Locations
 * @variables {Array} regionNames Array of Map Markers for lookup and rendering <Marker/> View Components @see See [src/views] Marker.js
 * @property {number} lat The marker's latitude coordinate
 * @property {number} lng The marker's longtitude coordinate
 * @property {string} appellations Will be used for <InfoWindow/> View Component @see See [src/views] InfoWindow.js
 *
 * @author [Victor Ragojos](https://github.com/RagOfJoes)
 */
export const coordinates = {
    "Willamette Valley": {
        lat: 45.2825284,
        lng: -123.0408265,
        appellations: "Willamette Valley and Dundee Hills"
    },
    "Northern California": {
        lat: 38.4411547,
        lng: -122.3828042,
        appellations: "Anderson Valley, Russian River, and Napa Valley"
    },
    "Central Coast": {
        lat: 36.1343869,
        lng: -121.4507608,
        appellations: "Santa Maria Valley and Santa Lucia Highlands"
    }
};

export const regionNames = [
    "Willamette Valley",
    "Northern California",
    "Central Coast"
];
