const precise = (num: number) => {
	return Number(Number(num).toPrecision(6));
};

export function isCoordinatesEqual(
	i: { lat: number; lng: number },
	j: { lat: number; lng: number },
) {
	return precise(i.lat) === precise(j.lat) && precise(i.lng) === precise(j.lng);
}
