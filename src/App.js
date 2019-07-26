import './App.scss';
import React from 'react';
import Map from './views/Map';
import Marker from './views/Marker';
import Section from './views/Section';
import { useSelector } from 'react-redux';
import { mapStyle } from './config/mapStyle';
import { coordinates, vineyardNames } from './config/coords';
import { Container, Row, Col } from 'reactstrap';

// TODO: Get API key
// TODO: Import google maps API
const App = () => {
  // console.log(process.env)
  const { mapCenter } = useSelector((state) => state.Map);
  return (
    <Container fluid className="App">
      <Row className="scroll-places-row">
        <Col className="scroll-places-col">
          <Section/>
        </Col>
      </Row>
      <Map
        // Map style props
        defaultZoom={12}
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
            minZoom: 12,
            maxZoom: 13,
            disableDefaultUI: true,

            // Custom Map Style
            styles: mapStyle
          }
        }
      >
        {
          // Map entire coordinates array for Markers and Vineyard names
          vineyardNames.map((vineyard) => {
            const { lat, lng } = coordinates[vineyard];
            return (
              <Marker
                // Position props
                lat={lat}
                lng={lng}

                // Key/Ref props
                key={vineyard}
                text={vineyard.includes("Estate") || vineyard.includes("Ranch") ? vineyard : vineyard.concat(" Vineyard")}

                // customIcon prop
                customIconImage={require("./assets/CustomMarker.svg")}

                // isFocused props
                isClickable
                /**  
                 * toPrecision method is for ensuring that lang & lng returned by onClick event, @see See [src/views](Marker), are the same as,
                 * @see See [src/config](coords), lat & lng
                 * 
                */
                isFocused={lat.toPrecision(10) === mapCenter.lat.toPrecision(10) && lng.toPrecision(10) === mapCenter.lng.toPrecision(10)}
              />
            )
          })
        }
      </Map>
    </Container>
  );
}

export default App;
