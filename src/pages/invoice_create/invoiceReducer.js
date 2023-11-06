import {
  CREATE_INVOICE_SUBMITTED,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_ERROR
} from "./InvoiceActionTypes";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorData: null
};

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_INVOICE_SUBMITTED:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorData: null
      };
    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errorData: null
      };
    case CREATE_INVOICE_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorData: action.errorData
      };
    default:
      return state;
  }
};
