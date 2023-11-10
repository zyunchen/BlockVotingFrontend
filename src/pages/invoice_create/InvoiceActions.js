import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_INVOICE_ERROR,
  CREATE_INVOICE_SUBMITTED,
  CREATE_INVOICE_SUCCESS,
} from "./InvoiceActionTypes";

export const createInvoice = (invoiceData) => (dispatch) => {
  dispatch({ type: CREATE_INVOICE_SUBMITTED });

  axios
    .post("/api/v1/Invoices/", invoiceData)
    .then((response) => {
      toast.success("Invoice created successfully.");
      dispatch({ type: CREATE_INVOICE_SUCCESS });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CREATE_INVOICE_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
