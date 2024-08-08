import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./navigation/DrawerNavigator";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default App;

registerRootComponent(App);
