import { toPrecise } from '../../views/Card/config';

export const checkCoord = (startLat, startLng, endLat, endLng) => {
	return toPrecise(startLat) === toPrecise(endLat) && toPrecise(startLng) === toPrecise(endLng);
};
