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
        caption: `Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sapiente modi quis porro recusandae ab ea omnis
        quisquam nemo in quidem. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit.`,
        vineyardNames: ["Prince Hill"]
    },
    {
        sectionTitle: "North Coast",
        appellations: "Anderson Valley, Russian River Valley, Dry Creek Valley, Napa Valley, Oakville, Calistoga",
        vineyardNames: [
            "Monument Tree",
            "Philo Estate",
            "Healdsburg Estate",
            "West Pin",
            "Last Stop",
            "Merino",
            "Calistoga Estate",
            "Oakville Estate",
            "Soda Canyon Ranch"
        ]
    },
    {
        sectionTitle: "Central Coast",
        appellations: "Santa Maria Valley, Santa Lucia Highlands",
        vineyardNames: ["Garys'", "Soberanes", "Bien Nacido"]
    }
];
