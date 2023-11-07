import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";  
import { connect } from "react-redux";          
import PropTypes from "prop-types"; 
import { login } from "./LoginActions"; 
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

import Grid from '@mui/material/Grid';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    console.log("Login " + userData.username + " " + userData.password);
    this.props.login(userData, "/home");
  };
  render() {
    return (
      <Grid container spacing={0.5}  justify="center" alignItems="center" justifyContent="center">
        <Grid item xs={5}>
          <Row>
            <Col></Col>
            <Col md="7">
              <h1>Invoice Administrator Login</h1>
              <Form>
                <Form.Group controlId="usernameId">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback type="invalid"></FormControl.Feedback>
                </Form.Group>

                <Form.Group controlId="passwordId">
                  <Form.Label>Your password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col md="7">
              <Button color="primary" onClick={this.onLoginClick}>Login</Button>
              <p className="mt-2">
                Don't have account? <Link to="/signup">Signup</Link>
              </p>
            </Col>
            <Col></Col>
          </Row>
        </Grid>
        <Grid item xs={7} className="background-image">
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));