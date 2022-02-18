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
	'Last Stop': {
		lat: 38.470977,
		lng: -122.89356,
		location: 'Russian River Valley, California',
		image: require('../assets/Last Stop.jpg'),
		caption: `Our estate vineyard named after the final destination of an old rail train`
	},
	'Westpin Vineyard': {
		lat: 38.5211001,
		lng: -122.8662024,
		location: 'Russian River Valley, California',
		image: require('../assets/Westpin Vineyard.jpg'),
		caption: `Our first Pinot Noir site—made for growing elegant Pinot Noir`
	},
	"Garys' Vineyard": {
		lat: 36.4422663,
		lng: -121.4402578,
		location: 'Santa Lucia Highlands, California',
		image: require('../assets/Garys.jpg'),
		caption: `Acclaimed as “one of the most famous vineyards” in the state`
	},
	'Soberanes Vineyard': {
		lat: 36.4407934,
		lng: -121.4391096,
		location: 'Santa Lucia Highlands, California',
		image: require('../assets/Soberanes.jpg'),
		caption: `The source of deep, expressive Pinot Noir with coastal influences `
	},
	'Bien Nacido Vineyard': {
		lat: 34.8946711,
		lng: -120.298725,
		location: 'Santa Maria Valley, California',
		image: require('../assets/Bien Nacido Vineyard.jpg'),
		caption: `Cool-climate vineyard organically farmed for expressive Pinot Noir`
	},
	'Prince Hill Vineyard': {
		lat: 45.2825284,
		lng: -123.0408265,
		location: 'Dundee Hills, Oregon',
		image: require('../assets/Prince Hill.jpg'),
		caption: `Our home (in Dundee, Oregon) away from home named after music royalty`
	},
	'Healdsburg Estate Vineyard': {
		lat: 38.5781274,
		lng: -122.8758549,
		location: 'Russian River Valley, California',
		image: require('../assets/Healdsburg Estate.jpg'),
		caption: `Less fog and more sunshine make for delicious Sauvignon Blanc—and a beautiful view from our winery on Westside Road`
	},
	'Merino Vineyard': {
		lat: 38.4365445,
		lng: -122.7832404,
		location: 'Russian River Valley, California',
		image: require('../assets/Merino Vineyard.jpg'),
		caption: `Where Sauvignon Blanc matures without being rushed`
	},
	'Oakville Estate Vineyard': {
		lat: 38.4411547,
		lng: -122.3828042,
		location: 'Napa Valley, California',
		image: require('../assets/Oakville Estate.jpg'),
		caption: `Fun fact: Rows surrounding Silver Oak in Oakville are planted for (our) Sauvignon Blanc`
	},
	'Calistoga Estate Vineyard': {
		lat: 38.5658304,
		lng: -122.5561176,
		location: 'Napa Valley, California',
		image: require('../assets/Calistoga Estate.jpg'),
		caption: `Planted to Sauvignon Blanc clones and surrounds our tasting room on Dunaweal Lane`
	},
	'Monument Tree Vineyard': {
		lat: 39.1149364,
		lng: -123.5132721,
		location: 'Anderson Valley, California',
		image: require('../assets/Monument Tree Vineyard.jpg'),
		caption: `Once you see the tree, you won’t forget the name`
	},
	'Bearman Bend Vineyard': {
		lat: 39.1097857,
		lng: -123.4917431,
		location: 'Anderson Valley, California',
		image: require('../assets/Bearman Bend Vineyard.jpg'),
		caption: `Sheep can be seen grazing to help maintain grass`
	}
};

export const vineyardNames = [
	'Prince Hill Vineyard',
	'Monument Tree Vineyard',
	'Bearman Bend Vineyard',
	'Healdsburg Estate Vineyard',
	'Westpin Vineyard',
	'Last Stop',
	'Merino Vineyard',
	'Calistoga Estate Vineyard',
	'Oakville Estate Vineyard',
	"Garys' Vineyard",
	'Soberanes Vineyard',
	'Bien Nacido Vineyard'
];
