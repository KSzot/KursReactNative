import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

//funckja jest wywolywana gdy wywolamy dispatch
//W tej funkcji authreducer zwrocimy nowy state
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

//podaje paramemtr disptch by miec dostep do useReducer a ten do boundActions by aktualizowac stan

const signup = (dispatch) => {
  return async ({ email, password }) => {
    //step by step
    //make api request to sign up

    // if we sign up, modify our state, and say that we are authenticated

    //if signing up fails, send error message

    try {
      const response = await trackerApi.post("/signup", { email, password });
      //console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      //nabigate to main flow
      navigate("TrackList");
    } catch (error) {
      //console.log(error.response.data);
      //dispatch gdy chcemy aktualizowac stan, nadajemy mu nazwe
      dispatch({ type: "add_error", payload: error.response.data });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    //try to signin
    //handle success by updating state
    //hanlde failure by showing err mess
    try {
      const response = await trackerApi.post("/signin", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (error) {
      //console.log(error.response.data);
      dispatch({
        type: "add_error",
        payload: error.response.data.error,
      });
    }
  };
};

const signout = (dispatch) => async () => {
  //somehow sign out
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);

//drugi parametr to obiekt ktory ma rozne action functions
//trzeci initial state = stan początkowy
