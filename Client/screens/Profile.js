import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useUser } from "../context/UserContext";
import CryptoJS from "crypto-js";
import Toast from "react-native-toast-message";
import CustomTextInput from "../components/CustomTextInput";

export default function Profile({ navigation }) {
  const { user, setUser: setGlobalUser } = useUser();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.user) {
      const userInfo = user.user;
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      console.log("User data loaded:", userInfo);
    } else {
      console.warn("User context is null or malformed:", user);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
      };

      if (password) {
        payload.password = CryptoJS.SHA256(password).toString();
      }

      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/users/user/${user.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to update profile:",
          response.status,
          response.statusText
        );
        console.error("Error data:", response);
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: errorData.message,
          visibilityTime: 3000,
          position: "top",
          autoHide: true,
          topOffset: 150,
          bottomOffset: 40,
        });
        return;
      }

      const data = await response.json();

      console.log("Profile updated successfully:", data);
      console.log("Updated User Details:", { firstName, lastName, email });

      setGlobalUser(data);

      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your profile has been updated successfully.",
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });

      setPassword("");
    } catch (error) {
      console.error("Error in updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.message,
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/users/user`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id: user.user._id }),
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to delete profile:",
          response.status,
          response.statusText
        );
        console.error("Error data:", response);
        Toast.show({
          type: "error",
          text1: "Deletion Failed",
          text2: errorData.message,
          visibilityTime: 3000,
          position: "top",
          autoHide: true,
          topOffset: 150,
          bottomOffset: 40,
        });
        return;
      }

      const data = await response.json();

      console.log("Profile deleted successfully:", data);
      Toast.show({
        type: "success",
        text1: "Profile Deleted",
        text2: "Your profile has been deleted successfully.",
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });

      setGlobalUser(null);
      navigation.navigate("Signup");
    } catch (error) {
      console.error("Error in deleting profile:", error);
      Toast.show({
        type: "error",
        text1: "Deletion Failed",
        text2: error.message,
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
    }
  };

  const handleSignOut = async () => {
    try {
      const token = user.token;

      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/users/signout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to sign out:",
          response.status,
          response.statusText
        );
        console.error("Error data:", response);
        return;
      }

      const data = await response.json();
      console.log("Signed out successfully:", data);

      navigation.navigate("SignUp", {
        screen: "SignUp",
        setGlobalUser: null,
        recentlyLoggedOut: true,
      });

      Toast.show({
        type: "success",
        text1: "Signed Out",
        text2: data.message,
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
    } catch (error) {
      console.error("Error in signing out:", error);
      Toast.show({
        type: "error",
        text1: "Sign Out Failed",
        text2: error.message,
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile Information</Text>
        <CustomTextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomTextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <CustomTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
            <Text style={styles.buttonText}>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDeleteProfile}>
            <Text style={styles.buttonText}>Delete </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#70DBDB",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 24,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
    fontFamily: "Roboto-BoldItalic",
  },

  button: {
    backgroundColor: "#1B3E90",
    padding: 10,
    borderRadius: 8,
    marginVertical: 1,
    width: "30%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});
