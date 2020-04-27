import React, { useContext, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import Map from "../components/Map";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import "../_mockLocation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation, state } = useContext(LocationContext);

  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  //Przekazujemy funkcje ktora wykona sie za kazdym razem gdy dostaniemy nowa lokalizajce
  //const [err] = useLocation((isFocused,location) => addLocation(location));
  //dluga wersja
  //console.log(isFocused);
  //const [err] = useLocation(isFocused, addLocation);
  const [err] = useLocation(isFocused || state.recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 32 }}>TrackCreateScreen</Text>
      <Map />
      {err ? <Text>Please enabl location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
