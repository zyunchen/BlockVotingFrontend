import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signupNewUser } from "./SignupActions"; 
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl
} from "react-bootstrap";

import Grid from '@mui/material/Grid';

class Signup extends Component {
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

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.signupNewUser(userData); // <-- signup new user request
  };

  render() {
    return (
      <Grid container spacing={0.5}  justify="center" alignItems="center" justifyContent="center">
        <Grid item xs={5}>
          <Row>
            <Col></Col>
            <Col md="7">
              <h1>Invoice Administrator Sign up</h1>
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
                    value={this.password}
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
              <Button 
                color="primary"
                onClick={this.onSignupClick}  
              >Sign up</Button>
              <p className="mt-2">
                Already have account? <Link to="/">Login</Link>
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

Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(withRouter(Signup));