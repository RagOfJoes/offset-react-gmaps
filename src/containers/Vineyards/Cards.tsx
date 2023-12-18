import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

import { useInView } from "react-intersection-observer";
import { MapRef, ViewState } from "react-map-gl";

import { Card } from "@/components/Card";
import { InfoWindowProps } from "@/components/InfoWindow";
import { useIsMobile } from "@/hooks/useIsMobile";
import { vineyards } from "@/lib/constants";
import { isCoordinatesEqual } from "@/lib/isCoordinatesEqual";

export type CardsProps = {
	isLoaded: boolean;
	isPanning: boolean;
	mapRef: RefObject<MapRef>;
	setPopup: Dispatch<
		SetStateAction<
			(InfoWindowProps & Pick<ViewState, "latitude" | "longitude">) | null
		>
	>;
	scrollRef: RefObject<HTMLDivElement>;
	toggleIsPanning: Dispatch<SetStateAction<boolean>>;
	vineyards: Array<keyof typeof vineyards>;
};

export function Cards(props: CardsProps) {
	const {
		isLoaded,
		isPanning,
		mapRef,
		scrollRef,
		setPopup,
		toggleIsPanning,
		vineyards: vineyardsProp,
	} = props;

	const isMobile = useIsMobile();

	return (
		<>
			{vineyardsProp.map((vineyard) => {
				const { caption, image, lat, lng, location, slug } =
					vineyards[vineyard];

				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { entry, inView, ref } = useInView({
					fallbackInView: true,
					onChange: (_inView) => {
						if (!isLoaded || !_inView) {
							return;
						}

						toggleIsPanning(true);
						mapRef.current?.panTo({ lat, lng });
						setPopup({
							image,
							location,
							latitude: lat,
							slug,
							longitude: lng,
							vineyard,
						});
					},
					root: scrollRef.current,
					threshold: isMobile ? 0.6 : 0.8,
				});

				// Wait until map has stopped panning to snap to card
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					const center = mapRef.current?.getCenter();
					if (!center || isPanning || !inView) {
						return;
					}

					const isCentered = isCoordinatesEqual({ ...center }, { lat, lng });
					if (!isCentered) {
						return;
					}

					entry?.target.scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "center",
					});
					// eslint-disable-next-line react-hooks/exhaustive-deps
				}, [entry?.target, isPanning, inView]);

				return (
					<Card
						ref={ref}
						caption={caption}
						image={image}
						key={slug}
						location={location}
						onImageClick={() => {
							entry?.target.scrollIntoView({
								behavior: "smooth",
								block: "center",
								inline: "center",
							});
						}}
						slug={slug}
						vineyard={vineyard}
					/>
				);
			})}
		</>
	);
}
