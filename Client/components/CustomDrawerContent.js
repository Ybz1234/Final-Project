import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../context/UserContext";
import { Avatar } from "react-native-paper";

const CustomDrawerContent = (props) => {
  const { user, setUser: setGlobalUser } = useUser();

  const handleLogout = () => {
    props.navigation.navigate("SignUp", { recentlyLoggedOut: true });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.profileContainer}>
        <Avatar.Text
          size={80}
          label={
            user && user.user
              ? `${user.user.firstName[0]}${user.user.lastName[0]}`
              : "G"
          }
          style={{ backgroundColor: "#1B3E90" }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.logoutContainer}>
          <MaterialCommunityIcons name="logout" size={22} color="#1B3E90" />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    backgroundColor: "#2EB8B8",
    borderRadius: 60,
    borderColor: "rgba(255, 255, 255, 0.8)",
    width: "60%",
    height: "15%",
    alignSelf: "center",
    borderWidth: 5,
    alignItems: "center",
  },
  logoutButton: {
    paddingVertical: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#1B3E90",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
