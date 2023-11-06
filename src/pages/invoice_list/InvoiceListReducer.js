import { GET_INVOICES_SUCCESS } from "./InvoiceListTypes";

const initialState = {
  invoices: [], // 初始状态为空数组
};

export const invoiceListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
      };
    default:
      return state;
  }
};
