import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { push } from "connected-react-router";

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

import Navbar from "../../component/Navbar";
import { ConstructionOutlined } from "@mui/icons-material";

class InvoiceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createUser: null,
      creationDate: "",
      customer: null,
      invoiceId: -1,
      modificationDate: "",
      price: 0,
      productDescription: "",
      quantity: 0,
      tax: 0,
      customers: [],
    };
  }
  componentDidMount() {
    this.getInvoiceById();
    this.getCustomers();
  }

  getInvoiceById() {
    // 发送网络请求
    console.log(this.props);
    const { match } = this.props;
    const invoiceId = match.params.id;
    axios
      .get(`/api/v1/Invoices/${invoiceId}`)
      .then((response) => {
        console.log(response.data);
        this.setState(response.data.data);
        console.log(this.state);
        toast.success("get invoice successfully.");
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEditClick = () => {
    const {
      createUser,
      creationDate,
      customer,
      invoiceId,
      modificationDate,
      price,
      productDescription,
      quantity,
      tax,
    } = this.state;

    console.log(createUser);
    const invoiceData = {
      productDescription,
      quantity,
      price,
      tax,
      customer,
      createUserId: createUser.uid,
    };

    console.log("patch");
    console.log(this.state.invoiceId);
    console.log(invoiceData);
    axios
      .patch(`/api/v1/Invoices/${this.state.invoiceId}`, invoiceData)
      .then((response) => {
        toast.success("Invoice updated successfully.");
      })
      .catch((error) => {
        if (error.response) {
          toast.error(JSON.stringify(error.response.data));
        } else if (error.message) {
          toast.error(JSON.stringify(error.message));
        } else {
          toast.error(JSON.stringify(error));
        }
      });
    push("/invoice_list");
  };

  getCustomers() {
    // 发送网络请求
    axios
      .get(`/api/v1/customers/`)
      .then((response) => {
        console.log(response.data);
        //this.setState((prevState) => ({
        //  ...prevState,
        //  customer: response.data,
        //}));
        this.state.customers = response.data;
        console.log(this.state);
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
    //console.log(this.state);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Row className="justify-content-center mt-4">
          <Col md="6">
            <h2>Edit Invoice</h2>
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
              <FormGroup controlId="customer">
                <FormLabel>Customer</FormLabel>
                <FormControl
                  as="select"
                  name="customer"
                  value={this.state.customer}
                  onChange={this.onChange}
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
              </FormGroup>

              <Button variant="primary" onClick={this.onEditClick}>
                Update Invoice
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(InvoiceEdit);
