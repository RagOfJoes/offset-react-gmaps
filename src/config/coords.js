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
    "Last Stop": {
        lat: 38.470977,
        lng: -122.89356,
        location: "Russian River Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "West Pin": {
        lat: 38.5211001,
        lng: -122.8662024,
        location: "Russian River Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Garys'": {
        lat: 36.4422663,
        lng: -121.4402578,
        location: "Santa Lucia Highlands, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    Soberanes: {
        lat: 36.4407934,
        lng: -121.4391096,
        location: "Santa Lucia Highlands, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Bien Nacido": {
        lat: 34.8946711,
        lng: -120.298725,
        location: "Santa Maria Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Prince Hill": {
        lat: 45.2825284,
        lng: -123.0408265,
        location: "Dundee Hills, Oregon",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Healdsburg Estate": {
        lat: 38.5781274,
        lng: -122.8758549,
        location: "Russian River Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    Merino: {
        lat: 38.4365445,
        lng: -122.7832404,
        location: "Russian River Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Oakville Estate": {
        lat: 38.4411547,
        lng: -122.3828042,
        location: "Napa Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Soda Canyon Ranch": {
        lat: 38.357897,
        lng: -122.278065,
        location: "Napa Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Calistoga Estate": {
        lat: 38.5658304,
        lng: -122.5561176,
        location: "Napa Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Monument Tree": {
        lat: 39.1149364,
        lng: -123.5132721,
        location: "Anderson Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    },
    "Philo Estate": {
        lat: 39.1097857,
        lng: -123.4917431,
        location: "Anderson Valley, California",
        image: require("../assets/temp-vineyard-img.png"),
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`
    }
};

export const vineyardNames = [
    "Prince Hill",
    "Monument Tree",
    "Philo Estate",
    "Healdsburg Estate",
    "West Pin",
    "Last Stop",
    "Merino",
    "Calistoga Estate",
    "Oakville Estate",
    "Soda Canyon Ranch",
    "Garys'",
    "Soberanes",
    "Bien Nacido"
];
