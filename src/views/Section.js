import React from 'react';
import { Card } from './Card';
import "../styles/Section.scss";
import { Row, Col } from 'reactstrap';
import { vineyardNames, coordinates } from '../config/coords';

const Section = (props) => {
    const { title, appellations, description } = props;
    return (
        <Row className="section-container">
            <Col className="section-container-col">
                <Row className="section-text-row">
                    <Col className="section-text-col">
                        <Row className="section-text-sectionTitle-row">
                            <h1>Northern California</h1>
                        </Row>
                        <Row className="section-text-appellations-row">
                            <h1><mark>APPELLATIONS: </mark>Anderson Valley, Russian River Valley, Dry Creek Valley, Napa Valley, Oakville, Calistoga</h1>
                        </Row>
                        <Row className="section-text-sectionDescription-row">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <div className="borderLine"></div>
                        </Row>
                        <Row className="section-divider-row">
                            <Col className="section-divider"></Col>
                        </Row>
                    </Col>
                </Row>
                <Card/>
            </Col>
        </Row>

    )
}

export default Section;