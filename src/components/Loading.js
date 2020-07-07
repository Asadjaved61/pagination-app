import React from "react";
import { Col, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Col className="d-flex justify-content-center align-items-center flex-column">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Col>
  );
};

export default Loading;
