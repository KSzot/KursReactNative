import 'react-native-gesture-handler';
import * as React from 'react';
import { createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import HomeScreen from './assets/src/screens/HomeScreen';
import SearchBar from './assets/src/components/SearchBar';
import ResultsShowScreen from './assets/src/screens/ResultsShowScreen';


const navigator = createStackNavigator({

  Home:HomeScreen,
  Search: SearchBar,
  ResultsShow: ResultsShowScreen
}, {

  initialRouteName: "Home",
  defaultNavigationOptions: {
    title: "Bussiness Search"
  }
});



export default createAppContainer(navigator);