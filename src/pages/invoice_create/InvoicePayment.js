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

import {
  CREATE_PAYMENT_ERROR,
  CREATE_PAYMENT_SUBMITTED,
  CREATE_PAYMENT_SUCCESS,
} from "./InvoiceActionTypes";

import Navbar from "../../component/Navbar";
import { ConstructionOutlined, ShieldTwoTone } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';


import { FaEdit, FaCreditCard, FaTrashAlt } from "react-icons/fa";


class InvoicePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      paymentId: 1,
      invoiceId: 0,
      amount: 0,
      totalAmount: 0,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.getInvoicePaymentById();
  }

  getInvoicePaymentById() {
    console.log(this.props);
    const { match } = this.props;
    const invoiceId = match.params.id;
    console.log(invoiceId);
    axios
      .get(`/api/v1/payments/${invoiceId}`)
      .then((response) => {
        console.log("payment data:" + response.data);
        if (!response.data || response.data.length == 0) { // No payment yet
          console.log("No payment yet.");
          axios
            .get(`/api/v1/Invoices/${invoiceId}`)
            .then((response1) => {
              console.log("invoice data:" + response1.data.data);
              this.setState({invoiceId: response1.data.data.invoiceId, totalPrice: response1.data.data.quantity * response1.data.data.price + response1.data.data.tax});
              console.log(this.state.totalPrice);
              toast.success("get invoice successfully.");
            })
            .catch((error1) => {
              // 处理错误
              if (error1.response1) {
                toast.error(JSON.stringify(error1.response1.data));
              } else if (error1.message) {
                toast.error(JSON.stringify(error1.message));
              } else {
                toast.error(JSON.stringify(error1));
              }
            });
        } else {
          this.setState({totalPrice: response.data[0].invoice.quantity * response.data[0].invoice.price + response.data[0].invoice.tax, invoiceId:response.data[0].invoice.invoiceId});
          this.setState({...this.state, payments: response.data});
          //console.log("invoiceID: " + this.state.invoiceId);
          console.log(this.state.totalPrice);
          console.log("this.state:" + this.state);
          //console.log("payments info: " + this.state.payments[0].amount);
          toast.success("get payment successfully.");
        }
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
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onPayClick = () => {

    const invoiceId = this.state.invoiceId;
    const amount = parseInt(this.state.amount, 10);

    const paymentData = {
      invoiceId,
      amount
    };

    console.log(paymentData);
    axios
      .post(`/api/v1/payments/`, paymentData)
      .then((response) => {
        toast.success("Payment post successfully.");
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

  addAmount = (amount) => {
    this.setState({totalAmount: this.state.totalAmount + amount});
  }


  render() {
  
    console.log("payments: " + JSON.stringify(this.state.payments[0]));
    return (
      <div>
        <Navbar />
        <h1>Payment List</h1>
        <h2>Invoice Infomation</h2>
        <div>
          {!(this.state.payments)? 
            <p>Invoice ID: {this.state.payments[0].invoice.invoiceId}  |  Total Payment: {this.state.payments[0].invoice.quantity * this.state.payments[0].invoice.price + this.state.payments[0].invoice.tax} </p>
          : <p>No payment yet!</p>}
        </div>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell align="right">Pay Amount</TableCell>
                <TableCell align="right">Payment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.payments.map((payment) => (
                <TableRow
                  key={payment.paymentId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="invoice">
                    {payment.paymentId}
                  </TableCell>
                  <TableCell align="right">{payment.amount}</TableCell>
                  <TableCell align="right">{payment.paymentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Row className="justify-content-center mt-4">
            <Col md="6">
              <h3></h3>
              <h3>Ready to Pay: ${this.state.totalPrice - this.state.totalAmount} left</h3>
              <Form>
                    <FormGroup controlId="amount">
                      <FormLabel>Pay Amount</FormLabel>
                      <FormControl
                        type="number"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                    <Button variant="primary" onClick={this.onPayClick}>
                      Pay
                    </Button>
              </Form>
            </Col>
          </Row>
        </div>
        {/* <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <p>Product Description: {invoice.productDescription}</p>
              <p>Quantity: {invoice.quantity}</p>
              <p>Price: {invoice.price}</p>
              <p>Tax: {invoice.tax}</p>
              <p>Creation Date: {invoice.creationDate}</p>
              <p>Modification Date: {invoice.modificationDate}</p>
              
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}
export default connect()(InvoicePayment);