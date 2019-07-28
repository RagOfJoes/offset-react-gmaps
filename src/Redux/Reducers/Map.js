const initState = {
    refs: {
        map: {
            zoom: 11,
            ref: undefined,
            center: {
                lat: 45.2825284,
                lng: -123.0408265
            }
        },
        scroll: {
            ref: undefined,
            isScrolling: false
        }
    },
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case "ASSIGN_SCROLL_REF":
            return {
                ...state,
                refs: {
                    ...state.refs,
                    scroll: {
                        ...state.refs.scroll,
                        ref: action.ref
                    }
                }
            };
        case "IS_SCROLLING":
            return {
                ...state,
                refs: {
                    ...state.refs,
                    scroll: {
                        ...state.refs.scroll,
                        isScrolling: action.isScrolling
                    }
                }
            };
        case "ASSIGN_MAP_REF":
            return {
                ...state,
                refs: {
                    ...state.refs,
                    map: {
                        ...state.refs.map,
                        ref: action.ref
                    }
                }
            };
        case "CHANGE_MAP_ZOOM":
            return {
                ...state,
                refs: {
                    ...state.refs,
                    map: {
                        ...state.refs.map,
                        zoom: action.zoom
                    }
                }
            };
        case "CHANGE_MAP_CENTER":
            return {
                ...state,
                refs: {
                    ...state.refs,
                    map: {
                        ...state.refs.map,
                        center: {
                            lat: action.lat,
                            lng: action.lng
                        }
                    }
                }
            };
        default:
            return state;
    }
};

export default reducer;
