import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { Card } from "react-native-paper";
import PageFrame from "../components/PageFrame";
import CryptoJS from "crypto-js";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const response = await fetch("https://final-project-sqlv.onrender.com/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        Alert.alert("Login Successful");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3500);
      } else {
        Alert.alert("Login Failed", "One or more details are wrong");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    console.log("Start Front-End: ", email, password, firstName, lastName);
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const response = await fetch("https://final-project-sqlv.onrender.com/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword, firstName, lastName }),
      });

      const data = await response.json();
      console.log("Data: ", data);
      console.log("Respone: ", response);
      if (response.ok) {
        setUser(data);
        Alert.alert("Sign Up Successful", `Hello, ${firstName} ${lastName}!`);
        setTimeout(() => {
          navigation.navigate("Home");
        }, 2500);
      } else {
        Alert.alert("Sign Up Failed", "Unable to sign up, please try again.");
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Sign Up Failed", error.message);
    }
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Hello, {firstName} {lastName}!
        </Text>
      </View>
    );
  }

  return (
    <PageFrame>
      <Card style={styles.card}>
        {isSignUp && (
          <>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={isSignUp ? "Sign Up" : "Login"}
          onPress={isSignUp ? handleSignUp : handleSignIn}
        />
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchText}>
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </Card>
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 16,
    width: "90%",
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "black",
    width: "100%",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  switchText: {
    color: "blue",
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
