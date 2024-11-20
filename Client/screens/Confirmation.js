import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ConfettiCannon from "react-native-confetti-cannon";
import { Text } from "react-native-paper";

const Confirmation = () => {
  const confettiRef = useRef(null);

  useEffect(() => {
    confettiRef.current.start();
  }, []);

  return (
    <View style={styles.container}>
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
      <Animatable.Text animation="fadeInUp" delay={500} style={styles.text}>
        Booking Confirmed!
      </Animatable.Text>
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: 0, y: 0 }}
        fadeOut={true}
        fallSpeed={3000}
      />
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
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
