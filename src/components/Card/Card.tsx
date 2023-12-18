import { forwardRef, MouseEventHandler } from "react";

export type CardProps = {
	caption: string;
	image: string;
	location: string;
	onImageClick?: MouseEventHandler<HTMLImageElement>;
	slug: string;
	vineyard: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
	(props: CardProps, ref) => {
		const { caption, image, location, onImageClick, slug, vineyard } = props;

		return (
			<div
				ref={ref}
				aria-label={vineyard}
				className="card-container"
				data-vineyard={vineyard}
			>
				<div className="card-container-row">
					<div className="card-image-col">
						<img src={image} alt={vineyard} onClick={onImageClick} />
					</div>

					<h2 className="card-vineyard club-name">{vineyard}</h2>
					<h3 className="card-location">{location}</h3>
					<p className="card-caption">{caption}</p>

					<a
						target="_top"
						href={`https://www.twomey.com/vineyards/${slug}`}
						className="card-button btn btn-primary"
					>
						Explore Vineyard
					</a>
				</div>
			</div>
		);
	},
);
