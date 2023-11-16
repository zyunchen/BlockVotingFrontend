import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../../component/Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <Card>
            <Card.Body>
              <Card.Title>Welcome!</Card.Title>
              {this.props.isAuthenticated ? (
                <div>
                <Row>
                  <Card.Text>You are logged in as <b>{this.props.username}</b>.</Card.Text>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>

                <Row>
                  <Col>
                    <Button variant="outline-primary" href="/invoice_create">Create an Invoice</Button>
                  </Col>
                  <Col>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button variant="outline-primary" href="/invoice_list">Show all the invoices</Button>
                  </Col>
                  <Col>
                  </Col>
                </Row>

                </div>
              ) : (
                <div>
                <Row>
                  <Card.Text>Please login first or signup new account.</Card.Text>
                </Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>
                <Row></Row>

                <Row>
                  <Col>
                    <Button variant="outline-primary" href="/">Login</Button>
                  </Col>
                  <Col>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Button variant="outline-primary" href="/signup">Sign up</Button>
                  </Col>
                  <Col>
                  </Col>
                </Row>

                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(withRouter(Home));
