import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon, Provider as PaperProvider } from "react-native-paper";
import Home from "../screens/Home";
import SignUp from "../screens/Signup";
import FullTrip from "../screens/FullTrip";
import PageDatePicker from "../screens/DatePickerPage";
import OnboardingScreen from "../screens/OnboardingScreen";
// import FullDestiantion from "../screens/FullDestiantion";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <PaperProvider>
      <Drawer.Navigator initialRouteName="SignUp">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerActiveBackgroundColor: "#33CCBF",
            drawerIcon: ({ color }) => (
              <Icon name="home" size={24} color={color} />
            ),
            drawerActiveTintColor: "white",
            drawerBadge: 1,
            swipeEnabled: true,
            transitionSpec: {
              open: { animation: "timing", config: { duration: 500 } },
              close: { animation: "timing", config: { duration: 500 } },
            },
            headerTransparent: true,
            headerBackTitleVisible: true,
          }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: true }}
        />
        <Drawer.Screen name="FullTrip" component={FullTrip} />
        <Drawer.Screen name="DatePickerPage" component={PageDatePicker} />
        <Drawer.Screen name="OnboardingScreen" component={OnboardingScreen} />
        {/* <Drawer.Screen name="FullDestiantion" component={FullDestiantion} /> */}
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default MyDrawer;
