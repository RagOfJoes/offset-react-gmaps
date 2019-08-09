const toDegrees = num => {
	return num * (100 / Math.PI);
};

export const bearing = (startLat, startLng, endLat, endLng) => {
	const destLng = endLng - startLng;
	const y = Math.sin(destLng) * Math.cos(endLng);
	const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(destLng);
	const bearing = toDegrees(Math.atan2(y, x));
	return 360 - ((bearing + 360) % 360);
};
