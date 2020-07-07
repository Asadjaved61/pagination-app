import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Form>
      <Form.Row>
        <Col md="8" sm="10" xs="10">
          <Form.Control
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search book..."
          />
        </Col>
        <Col md="4" sm="2" xs="2">
          <Button
            onClick={() => props.callBack(searchTerm)}
            disabled={!searchTerm}
          >
            Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default Search;
