import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInvoices } from "./InvoiceListActions";
import axios from "axios";
import { toast } from "react-toastify";
import { push } from "connected-react-router";

import Navbar from "../../component/Navbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import { FaEdit, FaCreditCard, FaTrashAlt } from "react-icons/fa";

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      username: "",
      uid: 0,
    };
  }

  componentDidMount() {
    // 发送网络请求
    const uid = this.props.uid;
    console.log("打印 uid 的值 是 " + uid);
    this.props.getInvoices(uid);
  }

  render() {
    const { invoices } = this.props;
    console.log("invoices-------hh-:" + JSON.stringify(invoices));

    const handleEdit = (itemId) => {
      // Implement edit functionality
      console.log(`Edit item with ID ${itemId}`);
    };

    const handlePay = (itemId) => {
      // Implement pay functionality
      console.log(`Pay for item with ID ${itemId}`);
    };

    const handleDelete = (itemId) => {
      // Implement delete functionality
      axios
        .delete(`/api/v1/Invoices/${itemId}`)
        .then((response) => {
          console.log(`Delete item with ID ${itemId}`);
          window.location.reload();
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
    };

    return (
      <div>
        <Navbar />
        <h1>Invoice List</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Product Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Create Date</TableCell>
                <TableCell align="right">Modification Date</TableCell>
                <TableCell align="right">DueDate</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.invoiceId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="invoice">
                    {invoice.invoiceId}
                  </TableCell>
                  <TableCell align="right">
                    {invoice.productDescription}
                  </TableCell>
                  <TableCell align="right">{invoice.quantity}</TableCell>
                  <TableCell align="right">{invoice.price}</TableCell>
                  <TableCell align="right">{invoice.customer.name}</TableCell>
                  <TableCell align="right">
                    {invoice.creationDate.split("T")[0]}
                  </TableCell>
                  <TableCell align="right">
                    {invoice.modificationDate.split("T")[0]}
                  </TableCell>
                  {/* <TableCell align="right">{invoice.dueDate.split('T')[0]}</TableCell> */}
                  <TableCell align="right">{invoice.dueDate}</TableCell>
                  <TableCell align="right">{invoice.status}</TableCell>
                  <TableCell align="right">
                    <div
                      className="button-container"
                      style={{ display: "flex", gap: "20px" }}
                    >
                      <Link to={`/invoice/edit/${invoice.invoiceId}`}>
                        <FaEdit size={30} />
                      </Link>
                      <FaCreditCard
                        size={30}
                        onClick={() => handlePay(invoice.invoiceId)}
                        role="button"
                      />
                      <FaTrashAlt
                        size={30}
                        onClick={() => handleDelete(invoice.invoiceId)}
                        role="button"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

//InvoiceList.propTypes = {
//  invoices: PropTypes.array.isRequired,
//};

// const mapStateToProps = (state) => ({
//   invoices: state.invoices, // 注意这里的 state 结构要根据实际情况来调整
// });

const mapStateToProps = (state) => {
  console.log("state is  " + JSON.stringify(state));
  console.log("打印 state.auth.uid 的值 是 " + state.auth.uid);
  console.log("map state to props" + state.invoices); // 确认 state.invoices 是否有值
  return {
    invoices: state.invoice.invoices,
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps, { getInvoices })(InvoiceList);
