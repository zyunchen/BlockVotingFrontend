import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInvoices } from "./InvoiceListActions";

import Navbar from "../../component/Navbar";

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
