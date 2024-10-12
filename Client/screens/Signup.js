import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Card, Title, Paragraph, Button, TextInput } from "react-native-paper";
import PageFrame from "../components/PageFrame";
import CryptoJS from "crypto-js";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const sendPushNotification = async () => {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Logged In Successfully!",
      body: "check your Email",
      // data: { navigate: "AboutScreen" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  const sendSignUpPushNotification = async () => {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Sign Up Successfully!",
      body: "Read the introduction to get started on your travel!",
      // data: { navigate: "AboutScreen" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
  const handleSignIn = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/users/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password: hashedPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setTimeout(() => {
          sendPushNotification();
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
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/users/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: hashedPassword,
            firstName,
            lastName,
          }),
        }
      );

      const data = await response.json();
      console.log("Data: ", data);
      console.log("Respone: ", response);
      if (response.ok) {
        setUser(data);
        setTimeout(() => {
          sendSignUpPushNotification();
          navigation.navigate("OnboardingScreen");
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
      <Animatable.View
        duration={1000}
        style={styles.container}
        onAnimationEnd={() => {
          setTimeout(() => {
            navigation.navigate("Home");
          }, 6000);
        }}
      >
        <Animatable.Image
          animation="fadeIn"
          duration={1500}
          style={styles.image}
          source={require("../assets/plane.gif")}
        />
      </Animatable.View>
    );
  }

  return (
    <PageFrame>
      <View style={styles.container}>
        <View style={styles.headlineContainer}>
          <Text style={styles.headline}>Fly & Travel</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </Title>
            <Paragraph style={styles.paragraph}>
              {isSignUp
                ? "Please fill in the form to create an account."
                : "Sign in to continue."}
            </Paragraph>
            {isSignUp && (
              <>
                <TextInput
                  label="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: "#29A3A3" } }}
                  placeholderTextColor="#29A3A3"
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: "#29A3A3" } }}
                  placeholderTextColor="#29A3A3"
                />
              </>
            )}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: "#29A3A3" } }}
              placeholderTextColor="#29A3A3"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: "#29A3A3" } }}
              placeholderTextColor="#29A3A3"
            />
            <Button
              mode="contained"
              onPress={isSignUp ? handleSignUp : handleSignIn}
              style={styles.button}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 18 }}
              buttonColor="#29A3A3"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.switchText}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </PageFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  headlineContainer: {
    marginBottom: 24,
  },
  headline: {
    fontSize: 38,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
    fontFamily: "Roboto-BoldItalic",
  },
  card: {
    padding: 16,
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto-BoldItalic",
    color: "#29A3A3",
    textAlign: "center",
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    alignSelf: "center",
    width: "60%",
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#29A3A3",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
  },
  message: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  switchText: {
    color: "#29A3A3",
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    backgroundColor: "white",
    width: "110%",
    height: "110%",
    resizeMode: "contain",
    alignSelf: "center",
    borderRadius: 1000,
    marginBottom: 24,
    borderRadius: 8,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 2, height: 2 },
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
