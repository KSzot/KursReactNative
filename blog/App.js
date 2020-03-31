import 'react-native-gesture-handler';
import * as React from 'react';
import { createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import IndexScreen from "./assets/src/screen/IndexScreen";
import { Provider} from './assets/src/context/BlogContext';
import ShowScreen from "./assets/src/screen/ShowScreen";
import CreateScreen from "./assets/src/screen/CreateScreen";
import EditScreen from "./assets/src/screen/EditScreen";

const navigator = createStackNavigator({

  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen
}, {

  initialRouteName: "Index",
  defaultNavigationOptions: {
    title: "Blogs"
  }
});

/* musze wyeksportowac caly projekt 
do manager projekt
export default createAppContainer(navigator);
*/
const App = createAppContainer(navigator);

export default () => {
  return (<Provider>
    <App />
    </Provider>
    );
};