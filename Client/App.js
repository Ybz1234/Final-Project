import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./navigation/DrawerNavigator";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import { createNavigationContainerRef } from "@react-navigation/native";
import { UserProvider } from "./context/UserContext";
import { TripProvider } from "./context/TripContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const projectId = "c7abc98a-16c6-4bb1-9a11-d2ea14fe3eb7";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const navigationRef = createNavigationContainerRef();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Failed to get push token for push notification!"
      );
      return;
    }

    try {
      const pushToken = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Expo Push Token:", pushToken);

      // Store the push token locally
      await AsyncStorage.setItem("expoPushToken", pushToken);

      return pushToken;
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  } else {
    Alert.alert(
      "Device Error",
      "Must use physical device for push notifications"
    );
  }
}

function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) =>
        console.log(
          "in useEffect app file registerForPushNotificationsAsync",
          error
        )
      );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification.date.toString());
      });

    // This listener is fired when a user taps on or interacts with a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response:", response);
        // Navigate to About screen when notification is tapped
        if (
          response?.notification?.request?.content?.data?.navigate === "About"
        ) {
          navigationRef.current?.navigate("About");
        }
      });

    return () => {
      // Clean up the notification listeners on unmount
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-Black": require("./assets/Roboto/Roboto-Black.ttf"),
      "Roboto-BlackItalic": require("./assets/Roboto/Roboto-BlackItalic.ttf"),
      "Roboto-Bold": require("./assets/Roboto/Roboto-Bold.ttf"),
      "Roboto-BoldItalic": require("./assets/Roboto/Roboto-BoldItalic.ttf"),
      "Roboto-Italic": require("./assets/Roboto/Roboto-Italic.ttf"),
      "Roboto-Light": require("./assets/Roboto/Roboto-Light.ttf"),
      "Roboto-LightItalic": require("./assets/Roboto/Roboto-LightItalic.ttf"),
      "Roboto-Medium": require("./assets/Roboto/Roboto-Medium.ttf"),
      "Roboto-MediumItalic": require("./assets/Roboto/Roboto-MediumItalic.ttf"),
      "Roboto-Regular": require("./assets/Roboto/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./assets/Roboto/Roboto-Thin.ttf"),
      "Roboto-ThinItalic": require("./assets/Roboto/Roboto-ThinItalic.ttf"),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <UserProvider>
      <TripProvider>
        <NavigationContainer ref={navigationRef}>
          <MyDrawer />
          <Toast />
        </NavigationContainer>
      </TripProvider>
    </UserProvider>
  );
}
export default App;
registerRootComponent(App);
