import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import SignUp from "../screens/Signup";
import FullTrip from "../screens/FullTrip";
import PageDatePicker from "../screens/DatePickerPage";
import OnboardingScreen from "../screens/OnboardingScreen";
import Profile from "../screens/Profile";
import FullDestination from "../screens/FullDestiantion";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
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
        drawerStyle: {
          width: 210,
          backgroundColor: "#2EB8B8",
        },
        lazy: true,
        drawerActiveTintColor: "#1B3E90",
        drawerInactiveTintColor: "rgba(255, 255, 255, 0.8)",
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
        name="FullDestination"
        component={FullDestination}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <PaperProvider>
      <RootStack.Navigator
        initialRouteName="SignUp"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="Main" component={MainDrawer} />
      </RootStack.Navigator>
    </PaperProvider>
  );
}

export default AppNavigator;
