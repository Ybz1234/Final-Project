import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Button, Icon, Provider as PaperProvider } from "react-native-paper";
import Home from "../screens/Home";
import SignUp from "../screens/Signup";
import FullTrip from "../screens/FullTrip";
import PageDatePicker from "../screens/DatePickerPage";
import OnboardingScreen from "../screens/OnboardingScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
            headerTitle: "",
            drawerActiveBackgroundColor: "#70DBDB",
            drawerActiveTintColor: "#1B3E90",
            headerTransparent: true,
            drawerLabeStyle: {
              marginLeft: -50,
            },
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={22} color={color} />
            ),
            drawerContentOptions: {
              activeTintColor: "#33CCBF",
              inactiveTintColor: "#33CCBF",
              labelStyle: {},
            },

            drawerStyle: {
              width: 200, // Set drawer width
            },
          }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-plus"
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="FullTrip"
          component={FullTrip}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="airplane" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="DatePicker"
          component={PageDatePicker}
          options={{
            headerTitle: "",

            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" size={22} color={color} />
            ),
            headerTransparent: true,
          }}
        />
        <Drawer.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={22}
                color={color}
              />
            ),
          }}
        />
        {/* <Drawer.Screen name="FullDestiantion" component={FullDestiantion} /> */}
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default MyDrawer;
