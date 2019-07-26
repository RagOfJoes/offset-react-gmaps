import './App.scss';
import React from 'react';
import Map from './views/Map';
import Marker from './views/Marker';
import { useSelector } from 'react-redux';
import { mapStyle } from './config/mapStyle';
import { coordinates } from './config/coords';
import { Container, Row, Col } from 'reactstrap';

// TODO: Get API key
// TODO: Import google maps API
const App = () => {
  // console.log(process.env)
  const { mapCenter } = useSelector((state) => state.Map);
  return (
    // TODO: Create Card component and 
    <Container fluid className="App">
      <Row className="scroll-places-row">
        <Col>
          <h1>NORTHERN CALIFORNIA</h1>
        </Col>
      </Row>

      {/* Start Map View */}
      <Map
        // Map style props
        defaultZoom={10}
        mapClassName="scroll-map-row"
        containerClassName="scroll-map-container"

        // Required props
        apiKey="AIzaSyAfLyiMPaR2VvvyGTqY7S6kX-SYcjUJyYE"
        defaultCenter={{ lat: 38.5781274, lng: -122.8758549 }}

        // KML Layer Props
        hasKmlLayer
        kmlLayerURL="http://www.google.com/maps/d/kml?forcekml=1&mid=1GzhhLKvqqJfFwnxdnkwW5q8qVaWZpzPI"

        // Map Options Props
        mapOptions={
          {
            minZoom: 10,
            maxZoom: 13,
            disableDefaultUI: true,

            // Custom Map Style
            styles: mapStyle
          }
        }
      >
        {
          // Map entire coordinates array for Markers and Vineyard names
          coordinates.map((coord) => {
            const { lat, lng, Vineyard } = coord;
            return (
              <Marker
                // Position props
                lat={lat}
                lng={lng}

                // Key/Ref props
                key={Vineyard}

                // customIcon prop
                customIconImage={require("./assets/CustomMarker.svg")}

                // isFocused props
                isClickable
                isFocused={lat.toPrecision(10) === mapCenter.lat.toPrecision(10) && lng.toPrecision(10) === mapCenter.lng.toPrecision(10)}
              />
            )
          })
        }
      </Map>
      {/* End Map View */}
    </Container>
  );
}

export default App;
