import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "../screens/Home";
import SignUp from "../screens/Signup";
import FullTrip from "../screens/FullTrip";
import PageDatePicker from "../screens/DatePicker";
// import FullDestiantion from "../screens/FullDestiantion";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <PaperProvider>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="FullTrip" component={FullTrip} />
        <Drawer.Screen name="DatePicker" component={PageDatePicker} />
        {/* <Drawer.Screen name="FullDestiantion" component={FullDestiantion} /> */}
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default MyDrawer;
