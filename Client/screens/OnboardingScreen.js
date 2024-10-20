// OnboardingScreen.js

import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { IconButton } from "react-native-paper";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const steps = [
    {
      title: "Welcome to Fly and Travel!",
      description:
        "We help you easily build a multi-destination trip with just a few steps!",
    },
    {
      title: "Find Destinations",
      description:
        "Use the search bar to find a city Or pinpoint it on the map to select multiple destinations!",
    },
    {
      title: "Choose Dates!",
      description:
        "Select your starting date and set the duration for each destination.",
    },
    {
      title: "View Recommended Routes!",
      description:
        "Check the routes that were built and recommended, and change them if you desire.",
    },
    {
      title: "Book Your Multi-Travel Trip!",
      description:
        "Finalize your booking and embark on your multi-destination adventure!",
    },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigation.navigate("Main", { screen: "Home" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        key={currentStep}
        animation="fadeIn"
        duration={300} // Reduced duration for faster transition
        style={styles.stepContainer}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Text style={styles.description}>
            {steps[currentStep].description}
          </Text>

          {/* Step 1: Welcome */}
          {currentStep === 0 && (
            <Animatable.Image
              animation="zoomInDown"
              duration={8500}
              source={require("../assets/plane.gif")}
              style={styles.image}
              iterationCount="infinite"
            />
          )}

          {/* Step 2: Find Cities */}
          {currentStep === 1 && (
            <Animatable.View
              animation="fadeIn"
              duration={500}
              style={styles.mapContainer}
            >
              <Image
                source={require("../assets/map.png")}
                style={styles.mapImage}
              />
              <Animatable.View
                animation="bounceInDown"
                delay={0}
                style={styles.pinContainer}
                duration={4500}
                iterationCount="infinite"
                easing={"ease-in-out"}
              >
                <IconButton icon="map-marker" size={50} iconColor="red" />
              </Animatable.View>
              <Animatable.View
                animation="bounceInDown"
                delay={500}
                style={styles.pinContainer2}
                duration={3800}
                iterationCount="infinite"
                easing={"ease-in-out"}
              >
                <IconButton icon="map-marker" size={50} iconColor="red" />
              </Animatable.View>
            </Animatable.View>
          )}

          {/* Step 3: Choose Dates and Duration */}
          {currentStep === 2 && (
            <Animatable.Image
              animation="fadeIn"
              duration={500}
              source={require("../assets/dates.gif")}
              style={styles.image}
            />
          )}

          {/* Step 4: Review and Customize Routes */}
          {currentStep === 3 && (
            <Animatable.Image
              animation="fadeIn"
              duration={500}
              source={require("../assets/routes.gif")}
              style={styles.image}
            />
          )}

          {/* Step 5: Book Your Trip */}
          {currentStep === 4 && (
            <Animatable.Image
              animation="fadeIn"
              duration={500}
              source={require("../assets/book.gif")}
              style={styles.image}
            />
          )}
        </View>
      </Animatable.View>

      <View style={styles.navContainer}>
        {currentStep > 0 && (
          <IconButton
            icon="chevron-left-circle"
            size={40}
            onPress={handlePrevStep}
            style={styles.button}
          />
        )}
        <IconButton
          icon={
            currentStep < steps.length - 1
              ? "chevron-right-circle"
              : "check-circle"
          }
          size={40}
          onPress={handleNextStep}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2EB8B8",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    alignContent: "center",
    width: width * 0.9,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  stepContainer: {
    width: width * 0.9,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontFamily: "Roboto-BoldItalic",
    textAlign: "center",
    color: "#A9BFF5",
  },
  description: {
    fontSize: 20,
    fontFamily: "Roboto-MediumItalic",
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  mapContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  mapImage: {
    width: 200,
    height: 160,
  },
  pinContainer: {
    position: "absolute",
    left: 30,
    top: -30,
  },
  pinContainer2: {
    position: "absolute",
    left: 140,
    top: -35,
  },
  navContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default OnboardingScreen;
