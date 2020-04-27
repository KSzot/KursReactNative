import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
/*NavigationEvents nic nie pokazuje na ekranie, zamiast tego możemy przekazać kilka funkcji zwrotnych. Wywoła ja za każdym razem gdy renderujemy lub nawigujemy do naszego ekranu
useEffect wykonany na podobnej zasadzie w blogposts*/
const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign in to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        /*onSubmit={({email, password}) => signup({email, passowrd})} dluzsza werjsa do zrozumienia */
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead!"
      />
    </View>
  );
};

SigninScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});

export default SigninScreen;
