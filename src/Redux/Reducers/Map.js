const initState = {
    mapRef: "",
    mapZoom: 10,
    mapCenter: { lat: 38.5781274, lng: -122.8758549 },
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "ASSIGN_MAP_REF":
            return {
                ...state,
                mapRef: action.ref
            }
        case "CHANGE_MAP_ZOOM":
            return {
                ...state,
                mapZoom: action.zoom
            }
        case "CHANGE_MAP_CENTER":
            return {
                ...state,
                mapZoom: action.zoom,
                mapCenter: { lat: action.lat, lng: action.lng }
            }
        default:
            return state;
    }
}

export default reducer;