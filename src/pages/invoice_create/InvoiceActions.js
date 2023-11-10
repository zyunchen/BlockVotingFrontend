import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_INVOICE_ERROR,
  CREATE_INVOICE_SUBMITTED,
  CREATE_INVOICE_SUCCESS,
  GET_INVOICE_SUCCESS,
  EDIT_INVOICE_SUCCESS
} from "./InvoiceActionTypes";


export const createInvoice = invoiceData => dispatch => {
  dispatch({ type: CREATE_INVOICE_SUBMITTED });

  axios
    .post("/api/v1/Invoices/", invoiceData)
    .then(response => {
      toast.success("Invoice created successfully.");
      dispatch({ type: CREATE_INVOICE_SUCCESS });
    })
    .catch(error => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CREATE_INVOICE_ERROR,
          errorData: error.response.data
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
export const getInvoicesById = (Id) => dispatch=> {
  console.log(Id);
  axios.get(`http://34.218.230.44:8888/api/v1/Invoices/${Id}`)
    .then((response) => {
      // 请求成功时，将返回的 Invoices 数据传递给 Redux Store
      const invoice = response.data;
      toast.success("get invoice successfully.");
      console.log(invoice);
      dispatch({
            type: GET_INVOICE_SUCCESS,
            data: invoice
          });

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
export const editInvoice = (Id, invoiceData) => dispatch => {
  axios
    .post(`/api/v1/Invoices/${Id}`, invoiceData)
    .then(response => {
      toast.success("Invoice updated successfully.");
      dispatch({ type: EDIT_INVOICE_SUCCESS });
    })
    .catch(error => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};