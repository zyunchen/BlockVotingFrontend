import { GET_INVOICES_SUCCESS } from "./InvoiceListTypes";
import axios from "axios";
import { toast } from "react-toastify";

export const getInvoices = (uid) => (dispatch) => {
  //axios.get(`/api/v1/Invoices/${uid}`)
  axios
    .get(`/api/v1/Invoices`)
    .then((response) => {
      // 请求成功时，将返回的 Invoices 数据传递给 Redux Store
      const invoices = response.data;
      // toast.success("get invoices successfully.");
      console.log(invoices);
      dispatch({
        type: GET_INVOICES_SUCCESS,
        data: invoices,
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
