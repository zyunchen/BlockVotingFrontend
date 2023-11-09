import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInvoices } from "./InvoiceListActions";

import Navbar from "../../component/Navbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { FaEdit, FaCreditCard, FaTrashAlt } from "react-icons/fa";

class InvoiceList extends Component {
  constructor(props) {
    super(props);
    // this.state = store.getState()
    // this.changeInputVal = this.changeInputVal.bind(this);
    // this.addList = this.addList.bind(this);
    // this.delClick = this.delClick.bind(this);
    // // 让组件更新
    // this.storeChange = this.storeChange.bind(this)  //转变this指向
    // store.subscribe(this.storeChange) //订阅Redux的状态
  }

  componentDidMount() {
    // 发送网络请求
    this.props.getInvoices();
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
      console.log(`Delete item with ID ${itemId}`);
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
                <TableCell align="right">Tax</TableCell>
                <TableCell align="right">Create Date</TableCell>
                <TableCell align="right">Modification Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="invoice">
                    {invoice.id}
                  </TableCell>
                  <TableCell align="right">
                    {invoice.productDescription}
                  </TableCell>
                  <TableCell align="right">{invoice.quantity}</TableCell>
                  <TableCell align="right">{invoice.price}</TableCell>
                  <TableCell align="right">{invoice.tax}</TableCell>
                  <TableCell align="right">{invoice.creationDate}</TableCell>
                  <TableCell align="right">
                    {invoice.modificationDate}
                  </TableCell>
                  <TableCell align="right">
                    <div
                      className="button-container"
                      style={{ display: "flex", gap: "20px" }}
                    >
                      <FaEdit
                        size={30}
                        onClick={() => handleEdit(invoice.id)}
                        role="button"
                      />
                      <FaCreditCard
                        size={30}
                        onClick={() => handlePay(invoice.id)}
                        role="button"
                      />
                      <FaTrashAlt
                        size={30}
                        onClick={() => handleDelete(invoice.id)}
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

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

// const mapStateToProps = (state) => ({
//   invoices: state.invoices, // 注意这里的 state 结构要根据实际情况来调整
// });

const mapStateToProps = (state) => {
  console.log("state is  " + JSON.stringify(state));
  console.log("打印 state.auth.uid 的值 是 " + state.auth.uid);
  console.log("map state to props" + state.invoices); // 确认 state.invoices 是否有值
  return {
    invoices: state.invoice.invoices,
  };
};

export default connect(mapStateToProps, { getInvoices })(InvoiceList);
