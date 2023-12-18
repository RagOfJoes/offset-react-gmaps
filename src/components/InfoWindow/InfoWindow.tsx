export type InfoWindowProps = {
	image: string;
	location: string;
	slug: string;
	vineyard: string;
};

export function InfoWindow(props: InfoWindowProps) {
	const { image, location, slug, vineyard } = props;

	return (
		<div className="popup-container">
			<div className="popup-image">
				<img alt="Region" src={image} />
			</div>

			<div className="info-window-information">
				<p className="info-window-region">{vineyard}</p>
				<p className="info-window-appellations">{location}</p>
				<a href={`https://www.twomey.com/vineyards/${slug}`} target="_top">
					<p className="info-window-link">Explore Vineyard</p>
				</a>
			</div>
		</div>
	);
}
