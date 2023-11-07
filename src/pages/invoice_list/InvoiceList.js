import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "../../component/Navbar";

class InvoiceList extends Component {
  render() {
    const { invoices } = this.props;

    return (
      <div>
        <Navbar/>
        <h1>Invoice List</h1>
        <ul>
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <p>Product Description: {invoice.productDescription}</p>
              <p>Quantity: {invoice.quantity}</p>
              <p>Price: {invoice.price}</p>
              <p>Tax: {invoice.tax}</p>
              <p>Creation Date: {invoice.creationDate}</p>
              <p>Modification Date: {invoice.modificationDate}</p>
              {/* 其他信息... */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  invoices: state.invoice.invoices, // 注意这里的 state 结构要根据实际情况来调整
});

export default connect(mapStateToProps)(InvoiceList);
