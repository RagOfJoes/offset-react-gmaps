/**
 * @variables {object} coordinates HashMap of Map Marker Locations
 * @variables {Array} vineyardNames Array of Map Markers for lookup and rendering <Card/> View Components @see See [src/views] Card.js
 * @property {number} lat The marker's latitude coordinate
 * @property {number} lng The marker's longtitude coordinate
 * @property {string} location The marker's general location
 * @property {string} image This will be used to render custom image onto @see See [src/views] Card.js
 * @property {string} caption This will be used to render custom caption/desciption of vineyard onto @see See [src/views] Card.js
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
