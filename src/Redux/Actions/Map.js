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

export const changeMapCenter = (lat, lng) => ({
    type: "CHANGE_MAP_CENTER",
    lat, lng
})