import './App.scss';
import React from 'react';
import Map from './views/Map';
import Marker from './views/Marker';
import { Container, Row, Col } from 'reactstrap';
import { coordinates } from './config/coords';
import { useSelector } from 'react-redux';

// TODO: Get API key
// TODO: Import google maps API
const App = () => {
  // console.log(process.env)
  const { mapCenter } = useSelector((state) => state.Map);
  return (
    <Container fluid className="App">
      <Row className="scroll-places-row">
        <Col>
          <h1>NORTHERN CALIFORNIA</h1>
        </Col>
      </Row>
      <Map
        defaultCenter={{ lat:38.5781274, lng: -122.8758549}}
      >
        {
          coordinates.map((coord) => {
            const { lat, lng, Vineyard } = coord;
            return (
              <Marker key={Vineyard} lat={lat} lng={lng} isFocused={lat.toPrecision(10) === mapCenter.lat.toPrecision(10) && lng.toPrecision(10) === mapCenter.lng.toPrecision(10)} />
            )
          })
        }
        {/* Markers go here */}
      </Map>
    </Container>
  );
}

export default App;
