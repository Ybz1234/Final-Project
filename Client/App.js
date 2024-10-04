import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./navigation/DrawerNavigator";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";
import { createNavigationContainerRef } from "@react-navigation/native";
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

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const projectId =
      Constants.manifest.extra?.eas?.projectId ||
      Constants.expoConfig?.extra?.eas?.projectId ||
      Constants.manifest?.projectId;

    if (!projectId) {
      Alert.alert("Error", "Project ID not found");
      return;
    }

    try {
      const pushToken = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Expo Push Token:", pushToken);
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

  return (
    <NavigationContainer ref={navigationRef}>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;

registerRootComponent(App);
