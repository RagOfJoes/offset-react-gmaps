import BearmanBend from "/Bearman Bend Vineyard.jpg";
import BienNacido from "/Bien Nacido Vineyard.jpg";
import Calistoga from "/Calistoga Estate.jpg";
import Garys from "/Garys.jpg";
import Healdsburg from "/Healdsburg Estate.jpg";
import Hirsch from "/Hirsch Vineyard.jpg";
import LastStop from "/Last Stop.jpg";
import Merino from "/Merino Vineyard.jpg";
import MonumentTree from "/Monument Tree Vineyard.jpg";
import Oakville from "/Oakville Estate.jpg";
import PrinceHill from "/Prince Hill.jpg";
import Soberanes from "/Soberanes.jpg";
import WestPin from "/Westpin Vineyard.jpg";

export const vineyards = {
	"Bearman Bend Vineyard": {
		caption: "Sheep can be seen grazing to help maintain grass",
		image: BearmanBend,
		lat: 39.1097857,
		lng: -123.4917431,
		location: "Anderson Valley, California",
		slug: "north-coast/bearman-bend-vineyard",
	},
	"Bien Nacido Vineyard": {
		caption:
			"Cool-climate vineyard organically farmed for expressive Pinot Noir",
		image: BienNacido,
		lat: 34.8946711,
		lng: -120.298725,
		location: "Santa Maria Valley, California",
		slug: "central-coast/bien-nacido-vineyard",
	},
	"Calistoga Estate Vineyard": {
		caption:
			"Planted to Sauvignon Blanc clones and surrounds our tasting room on Dunaweal Lane",
		image: Calistoga,
		lat: 38.5658304,
		lng: -122.5561176,
		location: "Napa Valley, California",
		slug: "north-coast/calistoga-estate-vineyard",
	},
	"Garys’ Vineyard": {
		caption: "Acclaimed as “one of the most famous vineyards” in the state",
		image: Garys,
		lat: 36.4422663,
		lng: -121.4402578,
		location: "Santa Lucia Highlands, California",
		slug: "central-coast/garys-vineyard",
	},
	"Healdsburg Estate Vineyard": {
		caption:
			"Less fog and more sunshine make for delicious Sauvignon Blanc—and a beautiful view from our winery on Westside Road",
		image: Healdsburg,
		lat: 38.5781274,
		lng: -122.8758549,
		location: "Russian River Valley, California",
		slug: "north-coast/healdsburg-estate-vineyard",
	},
	"Hirsch Vineyard": {
		caption: "Acclaimed as one of the “most important California vineyards”",
		image: Hirsch,
		lat: 38.5696316,
		lng: -123.2499793,
		location: "Sonoma Valley, California",
		slug: "north-coast/hirsch-vineyard",
	},
	"Last Stop": {
		caption:
			"Our estate vineyard named after the final destination of an old rail train",
		image: LastStop,
		lat: 38.470977,
		lng: -122.89356,
		location: "Russian River Valley, California",
		slug: "north-coast/last-stop",
	},
	"Merino Vineyard": {
		caption: "Where Sauvignon Blanc matures without being rushed",
		image: Merino,
		lat: 38.4365445,
		lng: -122.7832404,
		location: "Russian River Valley, California",
		slug: "north-coast/merino-vineyard",
	},
	"Monument Tree Vineyard": {
		caption: "Once you see the tree, you won’t forget the name",
		image: MonumentTree,
		lat: 39.1149364,
		lng: -123.5132721,
		location: "Anderson Valley, California",
		slug: "north-coast/monument-tree-vineyard",
	},
	"Oakville Estate Vineyard": {
		caption:
			"Fun fact: Rows surrounding Silver Oak in Oakville are planted for (our) Sauvignon Blanc",
		image: Oakville,
		lat: 38.4411547,
		lng: -122.3828042,
		location: "Napa Valley, California",
		slug: "north-coast/oakville-estate-vineyard",
	},
	"Prince Hill Vineyard": {
		caption:
			"Our home (in Dundee, Oregon) away from home named after music royalty",
		image: PrinceHill,
		lat: 45.2825284,
		lng: -123.0408265,
		location: "Dundee Hills, Oregon",
		slug: "willamette-valley/prince-hill-vineyard",
	},
	"Soberanes Vineyard": {
		image: Soberanes,
		caption:
			"The source of deep, expressive Pinot Noir with coastal influences ",
		lat: 36.4407934,
		lng: -121.4391096,
		location: "Santa Lucia Highlands, California",
		slug: "central-coast/soberanes-vineyard",
	},
	"Westpin Vineyard": {
		image: WestPin,
		caption: "Our first Pinot Noir site—made for growing elegant Pinot Noir",
		lat: 38.5211001,
		lng: -122.8662024,
		location: "Russian River Valley, California",
		slug: "north-coast/westpin-vineyard",
	},
};

export const regions: {
	[region: string]: {
		sectionTitle: string;
		appellations: string;
		description: string;
		vineyards: Array<keyof typeof vineyards>;
	};
} = {
	"willamette-valley": {
		sectionTitle: "Willamette Valley",
		appellations: "Willamette Valley, Dundee Hills",
		description:
			"Oregon’s largest appellation, the Willamette Valley sits between the Oregon Coast Range in the west and the Cascade Mountains in the east.",
		vineyards: ["Prince Hill Vineyard"],
	},
	"north-coast": {
		sectionTitle: "North Coast",
		appellations:
			"Anderson Valley, Sonoma Valley, Russian River Valley, Dry Creek Valley, Napa Valley, Oakville, Calistoga",
		description:
			"Home to renowned California growing regions also known as Wine County, Northern California has deep roots in viticulture and winemaking.",
		vineyards: [
			"Monument Tree Vineyard",
			"Bearman Bend Vineyard",
			"Hirsch Vineyard",
			"Healdsburg Estate Vineyard",
			"Westpin Vineyard",
			"Last Stop",
			"Merino Vineyard",
			"Calistoga Estate Vineyard",
			"Oakville Estate Vineyard",
		],
	},
	"central-coast": {
		sectionTitle: "Central Coast",
		appellations: "Santa Maria Valley, Santa Lucia Highlands",
		description:
			"Comprised of six counties from Ventura (north of Los Angeles) to Santa Cruz (south of San Francisco), Central Coast spans much of California’s Pacific coastline.",
		vineyards: [
			"Garys’ Vineyard",
			"Soberanes Vineyard",
			"Bien Nacido Vineyard",
		],
	},
};
