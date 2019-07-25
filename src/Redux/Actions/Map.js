export const assignMapRef = (ref) => ({
    type: "ASSIGN_MAP_REF",
    ref
})

export const changeMapCenter = (lat, lng ) => ({
    type: "CHANGE_MAP_CENTER",
    lat, lng
})

export const changeMapZoom = () => ({
    type: "CHANGE_MAP_ZOOM"
})