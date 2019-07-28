import React from "react";
import "../styles/Section.scss";
import { Row, Col } from "reactstrap";

const Section = props => {
    const { title, appellations } = props;
    return (
        <Col className="section-container">
            <Row className="section-row">
                <Col className="section-title-Col col-12">
                    <h1>{title}</h1>
                </Col>
                <Col className="section-appellations-Col col-12">
                    <h2>
                        <mark>APELLATIONS:</mark> {appellations}
                    </h2>
                </Col>
                <Col className="section-description-Col col-12">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Labore, illo?
                    </p>
                </Col>
            </Row>
            <Row className="section-card-row">{props.children}</Row>
        </Col>
    );
};

export default Section;
