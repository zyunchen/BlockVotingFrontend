import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createInvoice } from "./InvoiceActions";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  FormGroup,
  FormLabel
} from "react-bootstrap";

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDescription: "",
      quantity: 0,
      price: 0,
      tax: 0,
      customerId: 1,
      createUserId: 1
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCreateClick = () => {
    const { productDescription, quantity, price, tax, customerId, createUserId } = this.state;

    const invoiceData = {
      productDescription,
      quantity,
      price,
      tax,
      customerId,
      createUserId
    };

    this.props.createInvoice(invoiceData);
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md="6">
            <h2>Create Invoice</h2>
            <Form>
              <FormGroup controlId="productDescription">
                <FormLabel>Product Description</FormLabel>
                <FormControl
                  type="text"
                  name="productDescription"
                  value={this.state.productDescription}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup controlId="quantity">
                <FormLabel>Quantity</FormLabel>
                <FormControl
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup controlId="price">
                <FormLabel>Price</FormLabel>
                <FormControl
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup controlId="tax">
                <FormLabel>Tax</FormLabel>
                <FormControl
                  type="number"
                  name="tax"
                  value={this.state.tax}
                  onChange={this.onChange}
                />
              </FormGroup>

              {/* Assuming customerId is a dropdown */}
              <FormGroup controlId="customerId">
                <FormLabel>Customer</FormLabel>
                <FormControl
                  as="select"
                  name="customerId"
                  value={this.state.customerId}
                  onChange={this.onChange}
                >
                  <option value={this.state.customerId}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  {/* Add options for customers here */}
                </FormControl>
              </FormGroup>

              <Button variant="primary" onClick={this.onCreateClick}>
                Create Invoice
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

InvoiceCreate.propTypes = {
  createInvoice: PropTypes.func.isRequired
};

export default connect(null, { createInvoice })(InvoiceCreate);