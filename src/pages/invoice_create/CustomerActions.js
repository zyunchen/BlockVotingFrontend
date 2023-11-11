import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CUSTOMER_ERROR,
  CREATE_CUSTOMER_SUBMITTED,
  CREATE_CUSTOMER_SUCCESS
} from "./InvoiceActionTypes";

export const createCustomer = (customerData) => (dispatch) => {
  dispatch({ type: CREATE_CUSTOMER_SUBMITTED });

  axios
    .post("/api/v1/customers/", customerData)
    .then((response) => {
      toast.success("Customer created successfully.");
      dispatch({ type: CREATE_CUSTOMER_SUCCESS });
    })
    .catch((error) => {
      if (error.response) {
        toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: CREATE_CUSTOMER_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        toast.error(JSON.stringify(error.message));
      } else {
        toast.error(JSON.stringify(error));
      }
    });
};
