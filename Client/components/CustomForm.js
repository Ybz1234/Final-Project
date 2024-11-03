import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Card, Title, Paragraph, Button, TextInput } from "react-native-paper";

const CustomForm = ({
  isSignUp,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleSignUp,
  handleSignIn,
  setIsSignUp,
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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
  switchText: {
    color: "#29A3A3",
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomForm;
