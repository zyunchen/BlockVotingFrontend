import { GET_INVOICES_SUCCESS } from "./InvoiceListTypes";

export const getInvoicesSuccess = (invoices) => {
  return {
    type: GET_INVOICES_SUCCESS,
    payload: invoices,
  };
};
