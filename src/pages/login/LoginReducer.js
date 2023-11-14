// import needed actions
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";

// define the initial state of the signup store
const initialState = {
  isAuthenticated: false,
  username: "test",
  uid:123
};

// define how action will change the state of the store
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_TOKEN:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     token: action.payload
    //   };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        uid: action.payload.uid,
      };
    case UNSET_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
}