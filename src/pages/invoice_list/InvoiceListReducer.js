import { GET_INVOICES_SUCCESS } from "./InvoiceListTypes";

const initialState = {
  invoices: [], // 初始状态为空数组
};

export const invoiceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      const invoices = [];
      console.log("action data" + JSON.stringify(action.data));
      return {
        ...state,
        invoices: action.data,
      };
    default:
      return state;
  }
};





