import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card, Title, Paragraph, Button, TextInput } from "react-native-paper";
import PageFrame from "../components/PageFrame";
import CryptoJS from "crypto-js";
import * as Animatable from "react-native-animatable";
import * as Notifications from "expo-notifications";
import { useUser } from "../context/UserContext";
import Toast from "react-native-toast-message";

export default function SignUp({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [recentlyLoggedOut, setRecentlyLoggedOut] = useState(false);

  const { setUser: setGlobalUser } = useUser();
  useEffect(() => {
    if (route.params?.recentlyLoggedOut) {
      setRecentlyLoggedOut(true);
    }
  }, [route.params]);
  const sendPushNotification = async () => {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Welcome, " + user.user?.firstName + "!",
      body: "We are glad to have you back!",
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
    setPassword("");
    setEmail("");
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
        setGlobalUser(data);
        setRecentlyLoggedOut(false);
        setTimeout(() => {
          setPassword("");
          setEmail("");
          setFirstName("");
          setLastName("");
          navigation.navigate("Main", { screen: "Home" });
          sendPushNotification();
        }, 1500);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "One or more details are wrong.",
          visibilityTime: 3000,
          position: "top",
          autoHide: true,
          topOffset: 150,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
        visibilityTime: 3000,
        position: "top",
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
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
      if (response.ok) {
        const { result, token } = data;
        const { insertedId } = result;
        const userObject = {
          _id: insertedId,
          email: email,
          firstName: firstName,
          lastName: lastName,
        };
        const fullUserData = {
          user: userObject,
          token: token,
        };
        setUser(fullUserData);
        setGlobalUser(fullUserData);
        setTimeout(() => {
          sendSignUpPushNotification();
          navigation.navigate("OnboardingScreen");
        }, 2500);
      } else {
        Toast.show({
          type: "error",
          text1: "Sign Up Failed",
          text2: "Unable to sign up, please try again.",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 150,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign Up Failed",
        text2: error.message,
        position: "top",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 150,
        bottomOffset: 40,
      });
    } finally {
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
    }
  };

  if (user && !recentlyLoggedOut) {
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
                  theme={{ colors: { primary: "#8957e5" } }}
                  placeholderTextColor="#8957e5"
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.input}
                  mode="outlined"
                  theme={{ colors: { primary: "#8957e5" } }}
                  placeholderTextColor="#8957e5"
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
              theme={{ colors: { primary: "#8957e5" } }}
              placeholderTextColor="#8957e5"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: "#8957e5" } }}
              placeholderTextColor="#8957e5"
            />
            <Button
              mode="contained"
              onPress={isSignUp ? handleSignUp : handleSignIn}
              style={styles.button}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={{ fontSize: 18 }}
              buttonColor="#8957e5"
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
    color: "#8957e5",
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
    backgroundColor: "#f1e8ff",
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
    color: "#8957e5",
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
    backgroundColor: "#8957e5",
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
    color: "#8957e5",
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
