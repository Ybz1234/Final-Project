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
import AsyncStorage from "@react-native-async-storage/async-storage"; // Added import
import axios from "axios"; // Added import

const projectId = "c7abc98a-16c6-4bb1-9a11-d2ea14fe3eb7";
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

    // const projectId = "c7abc98a-16c6-4bb1-9a11-d2ea14fe3eb7";

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

/**Teal shade for app!
 * #248F8F (rgb(36,143,143))
 * #2EB8B8 (rgb(46,184,184))
 * #47D1D1 (rgb(71,209,209))
 * #5CD6D6 (rgb(92,214,214))
 * #33CCA6 (rgb(51,204,166))
 * #33CCB3 (rgb(51,204,179))
 * #33CCBF (rgb(51,204,191))
 */

//?ACTIVE COLOR PALETTE
/*
shade of teals- #70DBDB ,#29A3A3
deep blue - #1B3E90
opacity white teal - rgba(255, 255, 255, 0.8)
*/
//?ALTERNATIVE COLOR PALETTE
/*
// Light purple (like GitHub's lighter accent)
"#f5f0ff"  // Very light purple background
"#f6f8ff"  // Light purple-blue tint
"#f1e8ff"  // Soft light purple

// Medium purple (like GitHub's primary purple)
"#8250df"  // GitHub's main purple
"#6e40c9"  // Slightly darker variant
"#7957d5"  // Medium bright purple

// Darker purple (for emphasis/borders)
"#5a32a3"  // Deep purple
"#4c2889"  // Rich dark purple
#1B0233
#07002A

// Real GitHub's color palette
#151b23
#0d1117
#010409
#8957e5

// Others
#f3f3f5
#f0f0f2
*/
