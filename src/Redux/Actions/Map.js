export const assignScrollRef = (ref) => ({
    type: "ASSIGN_SCROLL_REF",
    ref
})

export const isScrolling = (isScrolling) => ({
    type: "IS_SCROLLING",
    isScrolling
})

export const assignMapRef = (ref) => ({
    type: "ASSIGN_MAP_REF",
    ref
})

export const changeMapCenter = (zoom, lat, lng) => ({
    type: "CHANGE_MAP_CENTER",
    zoom, lat, lng
})

export const changeMapZoom = (zoom) => ({
    type: "CHANGE_MAP_ZOOM",
    zoom
})