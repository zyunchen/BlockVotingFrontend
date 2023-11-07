import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { signupReducer } from "./pages/signup/SignupReducer";
import { loginReducer } from "./pages/login/LoginReducer"; 
import { invoiceListReducer } from "./pages/invoice_list/InvoiceListReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    invoice: invoiceListReducer
  });

export default createRootReducer;