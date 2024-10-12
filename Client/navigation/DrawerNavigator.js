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

import FullDestiantion from "../screens/FullDestiantion";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <PaperProvider>
      <Drawer.Navigator
        initialRouteName="SignUp"
        minSwipeDistance={1250}
        screenOptions={{
          headerTintColor: "#1B3E90",
          headerTitle: "",
          swipeEnabled: true,
          drawerType: "back",
          headerStyle: {
            backgroundColor: "#2EB8B8",
          },
          headerBackgroundColor: "#29A3A3",
          overlayColor: "rgba(255, 255, 255, 0.6)",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={22} color={color} />
          ),
          drawerStyle: {
            width: 210,
            backgroundColor: "#2EB8B8",
          },
          lazy: true,
          drawerActiveTintColor: "#1B3E90", // Active color
          drawerInactiveTintColor: "rgba(255, 255, 255, 0.8)", // Inactive color
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="DatePicker"
          component={PageDatePicker}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar" size={22} color={color} />
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
          name="FullDestiantion"
          component={FullDestiantion}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="map-marker"
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          options={{
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
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default MyDrawer;
