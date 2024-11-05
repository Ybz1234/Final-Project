import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import TableExample from "../components/Table";
import PageFrame from "../components/PageFrame";

export default function Admin() {
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user.user?.role !== "admin") {
        console.log("Access Denied to user", user);
        console.log("user.firstName", user.user?.firstName);
        console.log("user.role", user.user?.role);
      Toast.show({
        type: "error",
        text1: "Access Denied",
        text2: "You do not have permission to view this page.",
        position: "top",
        visibilityTime: 3000,
        topOffset: 100,
      });
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  if (user.user?.role !== "admin") {
    return <Text style={styles.title}>Admin Dashboard</Text>
  }

  return (
    <PageFrame style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.message}>Welcome, {user.user?.firstName}!</Text>
      <TableExample/>
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 1,
    paddingHorizontal: 2,
    textAlign: "center",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textTransform: "uppercase",
    fontFamily: "Roboto-BoldItalic",
  },
  message: {
    fontSize: 18,
    color: "white",
    marginBottom: 24,
  },
});
