import React from 'react';
import "../styles/Card.scss"
import { Container, Row, Col } from 'reactstrap';

// TODO: Create a custom styles and className option
// TODO: Create a Desktop and Mobile version
export const Card = (props) => {
    const { title, location, description } = props;
    return (
        <Row className="card-container">
            <Col className="card-container-col">
                <Row className="card-image-row">
                    <Col className="card-image-col">
                    </Col>
                </Row>
                <Row className="card-text-row">
                    <Col className="card-text-col">
                        <Row className="card-text-title-row">
                            <h1>{title}</h1>
                        </Row>
                        <Row className="card-text-location-row">
                            <p>{location}</p>
                        </Row>
                        <Row className="card-text-description-row">
                            <p>Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Atque nesciunt fugit officia debitis
                        nobis iusto doloremque error facilis fugiat laboriosam.</p>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}