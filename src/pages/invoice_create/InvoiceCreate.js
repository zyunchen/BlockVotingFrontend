import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createInvoice } from "./InvoiceActions";
import { createCustomer } from "./CustomerActions";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Navbar from "../../component/Navbar";
import { Box } from "@mui/system";

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice_Details: {
        productDescription: "",
        quantity: 0,
        price: 0,
        tax: 0,
        dueDateObject: null,
        customerId: 1,
        createUserId: 1,
      },
      customer_Details: {
        customerId: 1,
        name: "",
        email: "",
      },
      customers: [],
    };
  }

  onChangeInvoice = (e) => {
    this.setState(({ invoice_Details }) => ({
      invoice_Details: { ...invoice_Details, [e.target.name]: e.target.value },
    }));
    //this.setState({ invoice_Details: {[e.target.name]: e.target.value }});
  };

  onChangeDueDate = (e) => {
    // console.log(this.state.invoice_Details.dueDate);
    // console.log(e);
    // this.setState(({ invoice_Details }) => ({
    //   invoice_Details: { ...invoice_Details, dueDate: e},
    // }));
    this.state.invoice_Details.dueDateObject = e;
    this.setState({ ...this.state });
    // console.log(this.state.invoice_Details.dueDate);
    // console.log(this.state);
  };

  onCreateClick = () => {
    const {
      productDescription,
      quantity,
      price,
      tax,
      dueDateObject,
      customerId,
      createUserId,
    } = this.state.invoice_Details;

    const dueDate = dueDateObject.toUTCString();

    const invoiceData = {
      productDescription,
      quantity,
      price,
      tax,
      dueDate,
      customerId,
      createUserId,
    };

    console.log(invoiceData);

    this.props.createInvoice(invoiceData);
  };

  modalState = {
    openModal: false,
  };

  onOpenModal = (e) => {
    e.preventDefault();
    this.setState({ openModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  onChangeCustomer = (e) => {
    this.setState(({ customer_Details }) => ({
      customer_Details: {
        ...customer_Details,
        [e.target.name]: e.target.value,
      },
    }));
  };

  getCustomers() {
    // 发送网络请求
    axios
      .get(`/api/v1/customers/`)
      .then((response) => {
        console.log("get customers: ", response.data);
        this.setState((prevState) => ({
          ...prevState,
          customers: response.data,
        }));
        //this.state.customers = response.data;
        console.log("this state: ", this.state);
        //toast.success("get customers successfully.");
        console.log("get customers successfully.");
      })
      .catch((error) => {
        // 处理错误
        if (error.response) {
          toast.error(JSON.stringify(error.response.data));
        } else if (error.message) {
          toast.error(JSON.stringify(error.message));
        } else {
          toast.error(JSON.stringify(error));
        }
      });
    console.log(this.state);
  }

  onCreateCustomerClick = () => {
    const { customerId, name, email } = this.state.customer_Details;

    const customerData = {
      customerId,
      name,
      email,
    };

    console.log(customerData);

    this.props.createCustomer(customerData);

    setTimeout(() => {
      this.getCustomers();
      this.onCloseModal();
    }, 100);
  };

  componentDidMount() {
    this.getCustomers();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.customers);
  //   if (prevState.customers !== this.state.customers) {
  //     console.log("change customer!!");
  //     console.log(this.state.customers);
  //     this.render();
  //   }
  // }

  render() {
    console.log("Rendering");
    return (
      <div>
        <Navbar />
        <Row className="justify-content-center mt-4">
          <Col md="6">
            <h3>Create Invoice</h3>
            <Form>
              <FormGroup
                as={Row}
                className="mb-3"
                controlId="productDescription"
              >
                <FormLabel column>Product Description</FormLabel>
                <Col md="9">
                  <FormControl
                    type="text"
                    name="productDescription"
                    value={this.state.invoice_Details.productDescription}
                    onChange={this.onChangeInvoice}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3" controlId="quantity">
                <FormLabel column>Quantity</FormLabel>
                <Col md="9">
                  <FormControl
                    type="number"
                    name="quantity"
                    value={this.state.invoice_Details.quantity}
                    onChange={this.onChangeInvoice}
                  />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3" controlId="price">
                <FormLabel column algin="right">
                  Price
                </FormLabel>
                <Col md="9">
                  <FormControl
                    type="number"
                    name="price"
                    value={this.state.invoice_Details.price}
                    onChange={this.onChangeInvoice}
                  />
                </Col>
              </FormGroup>

              {/* <FormGroup as={Row} className="mb-3" controlId="tax">
                <FormLabel>Tax</FormLabel>
                <FormControl
                  type="number"
                  name="tax"
                  value={this.state.invoice_Details.tax}
                  onChange={this.onChangeInvoice}
                />
              </FormGroup> */}
              <FormGroup as={Row} className="mb-3" controlId="dueDate">
                <FormLabel column>dueDate</FormLabel>
                <Col md="9">
                  <DatePicker
                    name="dueDate"
                    selected={this.state.invoice_Details.dueDateObject}
                    onChange={this.onChangeDueDate}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                  />
                </Col>
              </FormGroup>

              {/* Assuming customerId is a dropdown */}
              <FormGroup as={Row} className="mb-3" controlId="customerId">
                <FormLabel column>Customer</FormLabel>
                <Col md="6">
                  <FormControl
                    as="select"
                    name="customerId"
                    value={this.state.invoice_Details.customerId}
                    onChange={this.onChangeInvoice}
                  >
                    {this.state.customers.map((customer) => (
                      <option
                        key={customer.customerId}
                        value={customer.customerId}
                      >
                        {customer.name} {customer.email}
                      </option>
                    ))}
                  </FormControl>
                </Col>
                <Col md="3" className="d-flex">
                  <Button
                    variant="outline-primary"
                    onClick={this.onOpenModal}
                    style={{ marginLeft: "auto" }}
                  >
                    Add Customer
                  </Button>
                </Col>
              </FormGroup>
              <Row>
                <Button variant="primary" onClick={this.onCreateClick}>
                  Create Invoice
                </Button>
              </Row>
              <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Modal
                  open={this.state.openModal}
                  onClose={this.onCloseModal}
                  center
                  classNames={{
                    overlay: "custom-overlay",
                    modal: "custom-modal",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      width: "500px",
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                    }}
                  >
                    <h5>Add a New Customer</h5>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Form>
                      <FormGroup as={Row} controlId="customerName">
                        <FormLabel column>Customer Name</FormLabel>
                        <Col md="8">
                          <FormControl
                            type="text"
                            name="name"
                            value={this.state.customer_Details.name}
                            onChange={this.onChangeCustomer}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup as={Row} controlId="customerEmail">
                        <FormLabel column>Customer Email</FormLabel>
                        <Col md="8">
                          <FormControl
                            type="text"
                            name="email"
                            value={this.state.customer_Details.email}
                            onChange={this.onChangeCustomer}
                          />
                        </Col>
                      </FormGroup>
                      <Row>
                        <Button
                          variant="primary"
                          onClick={this.onCreateCustomerClick}
                        >
                          Create Customer
                        </Button>
                      </Row>
                    </Form>
                  </div>
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
  createCustomer: PropTypes.func.isRequired,
};

export default connect(null, { createInvoice, createCustomer })(InvoiceCreate);
