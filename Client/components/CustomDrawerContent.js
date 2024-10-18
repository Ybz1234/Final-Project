// CustomDrawerContent.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../context/UserContext"; // Import your user context

const CustomDrawerContent = (props) => {
  const { user, setUser: setGlobalUser } = useUser();

  // You can replace these with actual user data from your app's state or context

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user data and navigate to the login screen
    // navigation.navigate('SignUp');
    // Since we have navigation in props, we can use it directly
    props.navigation.navigate("SignUp", { recentlyLoggedOut: true });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        {user && user.user && user.user.profilePicture ? (
          <Image
            source={{ uri: user.user.profilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>
              {user && user.user
                ? `${user.user.firstName[0]}${user.user.lastName[0]}`
                : ""}
            </Text>
          </View>
        )}
        <Text style={styles.profileName}>
          {useUser && user.user
            ? `${user.user.firstName} ${user.user.lastName}`
            : "Guest"}
        </Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button */}
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
    borderRadius: 50,
    borderColor: "pink",
    borderWidth: 1,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderWidth: 5,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
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
