/**
 * Custom Google Map Style
 * 
 * @see See [Google Docs](https://developers.google.com/maps/documentation/javascript/style-reference)
 * @author [Victor Ragojos](https://github.com/ragofjoes)
 */
export const mapStyle = [
    {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [{ visibility: "simplified" }]
    },
    {
        featureType: "administrative.province",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "administrative.neighborhood",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
            {
                color: "#D5E8CC",
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#DCe5F5"
            }
        ]
    }
];
