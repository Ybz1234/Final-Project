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
import CustomDrawerContent from "../components/CustomDrawerContent";
import Admin from "../screens/Admin";
import HotelSelection from "../screens/HotelSelection";
import { useUser } from "../context/UserContext";
import AttractionSelection from "../screens/AttractionSelection";
import FinalDetails from "../screens/FinalDetails";

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

function MainDrawer() {
  const { user } = useUser();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      minSwipeDistance={1250}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "#8957e5",
        headerTitle: "",
        swipeEnabled: true,
        drawerType: "back",
        headerStyle: {
          backgroundColor: "#0d1117",
        },
        headerBackgroundColor: "#29A3A3",
        overlayColor: "rgba(255, 255, 255, 0.6)",
        drawerStyle: {
          width: 210,
          backgroundColor: "#0d1117",
        },
        lazy: true,
        drawerActiveTintColor: "#8957e5",
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
        name="Date Picker"
        component={PageDatePicker}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Route Info"
        component={FullTrip}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="airplane" size={22} color={color} />
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
      <Drawer.Screen
        name="Hotels selection"
        component={HotelSelection}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="city" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Attractions selection"
        component={AttractionSelection}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="ferris-wheel" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Booking"
        component={FinalDetails}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-open" size={22} color={color} />
          ),
        }}
      />
      {user.user?.role === "admin" && (
        <Drawer.Screen
          name="Admin"
          component={Admin}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="shield-account"
                size={22}
                color={color}
              />
            ),
          }}
        />
      )}
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
