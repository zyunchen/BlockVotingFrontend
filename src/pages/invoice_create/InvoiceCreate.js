import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createInvoice } from "./InvoiceActions";
import { createCustomer } from "./CustomerActions";

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
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Navbar from "../../component/Navbar";
import { Box } from '@mui/system';


class InvoiceCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice_Details: {
      productDescription: "",
      quantity: 0,
      price: 0,
      tax: 0,
      customerId: 1,
      createUserId: 1
      },
      customer_Details: {
        customerId: 1,
        name: "",
        email: ""
      }
    };

  }

  onChangeInvoice = e => {
    this.setState(({ invoice_Details }) => ({
      invoice_Details: {...invoice_Details, [e.target.name]: e.target.value }
    }));
    //this.setState({ invoice_Details: {[e.target.name]: e.target.value }});
  };

  onCreateClick = () => {
    const { productDescription, quantity, price, tax, customerId, createUserId } = this.state.invoice_Details;

    const invoiceData = {
      productDescription,
      quantity,
      price,
      tax,
      customerId,
      createUserId
    };

    console.log(invoiceData);

    this.props.createInvoice(invoiceData);
  };

  modalState = {
    openModal : false
  }

  onOpenModal = e =>{
    e.preventDefault()
    this.setState({openModal : true})
  }

  onCloseModal = ()=>{
      this.setState({openModal : false})
  }

  onChangeCustomer = e => {
    this.setState(({ customer_Details }) => ({
      customer_Details: {...customer_Details, [e.target.name]: e.target.value }
    }));
  };

  onCreateCustomerClick = () => {
    const { customerId, name, email } = this.state.customer_Details;

    const customerData = {
      customerId,
      name,
      email
    };

    console.log(customerData);

    this.props.createCustomer(customerData);
  };

  render() {
    return (
      <div>
      <Navbar/>
        <Row className="justify-content-center mt-4">
          <Col md="6">
            <h2>Create Invoice</h2>
            <Form>
              <FormGroup controlId="productDescription">
                <FormLabel>Product Description</FormLabel>
                <FormControl
                  type="text"
                  name="productDescription"
                  value={this.state.invoice_Details.productDescription}
                  onChange={this.onChangeInvoice}
                />
              </FormGroup>

              <FormGroup controlId="quantity">
                <FormLabel>Quantity</FormLabel>
                <FormControl
                  type="number"
                  name="quantity"
                  value={this.state.invoice_Details.quantity}
                  onChange={this.onChangeInvoice}
                />
              </FormGroup>

              <FormGroup controlId="price">
                <FormLabel>Price</FormLabel>
                <FormControl
                  type="number"
                  name="price"
                  value={this.state.invoice_Details.price}
                  onChange={this.onChangeInvoice}
                />
              </FormGroup>

              <FormGroup controlId="tax">
                <FormLabel>Tax</FormLabel>
                <FormControl
                  type="number"
                  name="tax"
                  value={this.state.invoice_Details.tax}
                  onChange={this.onChangeInvoice}
                />
              </FormGroup>

              {/* Assuming customerId is a dropdown */}
              <FormGroup controlId="customerId">
                <FormLabel>Customer</FormLabel>
                <FormControl
                  as="select"
                  name="customerId"
                  value={this.state.invoice_Details.customerId}
                  onChange={this.onChangeInvoice}
                >
                  <option value={this.state.invoice_Details.customerId}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  {/* Add options for customers here */}
                </FormControl>
              </FormGroup>
              <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="primary" onClick={this.onCreateClick}>
                  Create Invoice
                </Button>
                <Button variant="secondary" onClick={this.onOpenModal} style={{ marginLeft: "auto" }}>
                  Add Customer
                </Button>
                <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
                    <h1>Add a new customer</h1>
                    
                    <Form>
                      <FormGroup controlId="customerName">
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl
                          type="text"
                          name="name"
                          value={this.state.customer_Details.name}
                          onChange={this.onChangeCustomer}
                        />
                      </FormGroup>
                      <FormGroup controlId="customerEmail">
                        <FormLabel>Customer Email</FormLabel>
                        <FormControl
                          type="text"
                          name="email"
                          value={this.state.customer_Details.email}
                          onChange={this.onChangeCustomer}
                        />
                      </FormGroup>
                      <Button variant="primary" onClick={this.onCreateCustomerClick}>
                        Create Customer
                      </Button>
                    </Form>
                </Modal>   
              </Box>
              
            </Form>
          </Col>


        </Row>
      </div>
    );
  }
}

InvoiceCreate.propTypes = {
  createInvoice: PropTypes.func.isRequired,
  createCustomer: PropTypes.func.isRequired
};


export default connect(null, { createInvoice, createCustomer })(InvoiceCreate);