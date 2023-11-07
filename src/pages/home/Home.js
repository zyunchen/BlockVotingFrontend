
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";  
import { connect } from "react-redux";   

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
    return (
      <Container>
        
        <h1>Welcome to Invoice Management System</h1>
        
        {this.state.isAuthenticated ? (
          <div>
            <p>You are logged in as {this.state.username}.</p>
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
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/signup">Sign up</Link>
                </p>
          </div>
        )}


      </Container>
    );
  }
}

Home.propTypes = {
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  username: state.username,
  uid: state.uid
});

export default connect(mapStateToProps, {
  
})(withRouter(Home));