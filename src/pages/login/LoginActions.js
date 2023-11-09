import axios from "axios";
import { toast } from "react-toastify";
import { isEmpty } from "../../utils/Utils";
import { SET_TOKEN, SET_CURRENT_USER, UNSET_CURRENT_USER } from "./LoginTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";
import { push } from "connected-react-router";

export const login = (userData, redirectTo) => dispatch => {
  axios
    .post('http://34.218.230.44:8888/login', {
    username: userData.username,
    password: userData.password
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})    
    // .post("/api/v1/users/login", userData)
    .then(response => {
      const code = response.data.code;
      if (code === '0000') {
        const user = {
          username: response.data.data.username,
          uid: response.data.data.UId
        };
        toast.success( user.username + " login successfully!" );
        dispatch(setCurrentUser(user, redirectTo));
      // dispatch(getCurrentUser(redirectTo));
      // dispatch(push(redirectTo));
    } else if (code === '2003') {
      // Invalid username or password
      toast.error(JSON.stringify(response.data.msg));
    }
    })
    .catch(error => {
      if (error.resposne) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(JSON.stringify(error.response.data));
      } else if (error.message) {
        // the error message is available,
        // let's display it on error toast
        toast.error(JSON.stringify(error.message));
      } else {
        // strange error, just show it
        toast.error(JSON.stringify(error));
      }
      dispatch(unsetCurrentUser());
    });
};

// export const getCurrentUser = redirectTo => dispatch => {
//   axios
//     .get("/api/v1/users/me/")
//     .then(response => {
//       const user = {
//         username: response.data.username,
//         email: response.data.email
//       };
//       dispatch(setCurrentUser(user, redirectTo));
//     })
//     .catch(error => {
//       dispatch(unsetCurrentUser());
//       toastOnError(error);
//     });
// };

export const setCurrentUser = (user, redirectTo) => dispatch => {
  // localStorage.setItem("user", JSON.stringify(user));
  // console.log("user is  " + JSON.stringify(user));

  dispatch({
    type: SET_CURRENT_USER,
    payload: user
  });

  if (redirectTo !== "") {
    dispatch(push(redirectTo));
  }
};


// export const setToken = token => dispatch => {
//   setAxiosAuthToken(token);
//   localStorage.setItem("token", token);
//   dispatch({
//     type: SET_TOKEN,
//     payload: token
//   });
// };

export const unsetCurrentUser = () => dispatch => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({
    type: UNSET_CURRENT_USER
  });
};

export const logout = () => dispatch => {
  axios
    .post("/api/v1/token/logout/")
    .then(response => {
      dispatch(unsetCurrentUser());
      dispatch(push("/home"));
      toast.success("Logout successful.");
    })
    .catch(error => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};

