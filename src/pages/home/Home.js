
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";  
import { connect } from "react-redux";  

import Navbar from "../../component/Navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: "",
      uid: 0
    };
  }
  render() {
    // console.log("props is  " + JSON.stringify(this.props));
    return (
      <div>
      <Navbar/>
        <Container>
        
          <h1>Welcome to Invoice Management System</h1>
          
          {this.props.isAuthenticated ? (
            <div>
              <p>You are logged in as <b>{this.props.username}</b>.</p>
              <p>
            <Link to="/invoice_create">create a invoice</Link>
          </p>
          <p>
            <Link to="/invoice_list">invoice list</Link>
          </p>
            </div>
          ) : (
            <div>
              <p>You are not logged in. Use following link to login or signup!</p>
              <p>
                    <Link to="/">Login</Link>
                  </p>
                  <p>
                    <Link to="/signup">Sign up</Link>
                  </p>
            </div>
          )}


        </Container>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username,
  uid: state.auth.user.uid
});

export default connect(mapStateToProps)(withRouter(Home));