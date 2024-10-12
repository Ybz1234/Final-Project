import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import PageFrame from "../components/PageFrame";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ConfettiCannon from "react-native-confetti-cannon";
import { Text } from "react-native-paper";

const FullDestination = () => {
  const confettiRef = useRef(null);

  return (
    <PageFrame>
      <View style={styles.container}>
        {/* Glowing and Animated Checkmark Icon */}
        <Animatable.View
          animation="zoomIn"
          duration={1000}
          style={styles.iconContainer}
          onAnimationEnd={() => confettiRef.current.start()}
        >
          <MaterialCommunityIcons
            name="check-circle"
            size={150}
            color="#1B3E90"
            style={styles.icon}
          />
        </Animatable.View>

        {/* Animated Text */}
        <Animatable.Text animation="fadeInUp" delay={500} style={styles.text}>
          Booking Confirmed!
        </Animatable.Text>

        {/* Confetti Effect */}
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: 0, y: 0 }}
          fadeOut={true}
          fallSpeed={3000}
        />
      </View>
      <Text>detail of the trip in simple list here </Text>
    </PageFrame>
  );
};

export default FullDestination;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textShadowColor: "#1B3E90",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 28,
    color: "#1B3E90",
    fontWeight: "bold",
  },
});
