/**
 * @variable {Array} sections Array of different regions, this will be used to render @see See [src/views] Section.js
 * @property {string} sectionTitle Title of the Section
 * @property {string} appellations Region's appellations
 * @property {string} caption Section's caption/description
 * @property {string[]} vineyardNames Section's Vineyards, this will be used to render list of @see See [src/view] Card.js
 *
 * @author [Victor Ragojos](https://github.com/RagOfJoes)
 */
export const sections = [
	{
		sectionTitle: "Willamette Valley",
		appellations: "Willamette Valley, Dundee Hills",
		description: `Oregon’s largest appellation, the Willamette Valley sits between the Oregon Coast Range in the west and the Cascade Mountains in the east.`,
		vineyardNames: ["Prince Hill Vineyard"]
	},
	{
		sectionTitle: "North Coast",
		appellations: "Anderson Valley, Russian River Valley, Dry Creek Valley, Napa Valley, Oakville, Calistoga",
		description: `Home to renowned California growing regions also known as Wine County, Northern California has deep roots in viticulture and winemaking.`,
		vineyardNames: [
			"Monument Tree Vineyard",
			"Philo Estate Vineyard",
			"Healdsburg Estate Vineyard",
			"Westpin Vineyard",
			"Last Stop",
			"Merino Vineyard",
			"Calistoga Estate Vineyard",
			"Oakville Estate Vineyard",
			"Soda Canyon Ranch Vineyard"
		]
	},
	{
		sectionTitle: "Central Coast",
		appellations: "Santa Maria Valley, Santa Lucia Highlands",
		vineyardNames: ["Garys' Vineyard", "Soberanes Vineyard", "Bien Nacido Vineyard"],
		description: `Comprised of six counties from Ventura (north of Los Angeles) to Santa Cruz (south of San Francisco), Central Coast spans much of California’s Pacific coastline.`
	}
];
