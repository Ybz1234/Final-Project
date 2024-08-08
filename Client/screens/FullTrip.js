import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState } from "react";
import CardsSlide from "../components/CardsSlide";
import PageFrame from "../components/PageFrame";

const FullTrip = ({ route, navigation }) => {
  const { daysArray } = route.params; // Extract daysArray here
  const [detailedFlightTickets, setDetailedFlightTickets] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const fetchFlightDetails = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/FlightTicket/userUpToDateFlightTickets`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "667e745b85bee8cf5b8c3253" }),
        }
      );

      if (!response.ok) {
        console.log("Error:", response.data);
        return;
      }

      const data = await response.json();
      //console.log("FullTripDATA!", data);
      setDetailedFlightTickets(data.flightTickets);
      setIsDataFetched(true);
    } catch (error) {
      console.log("Error FullTrip", error.message);
    }
  };

  const handleDestination = () => {
    navigation.navigate("FullDestiantion");
  };

  const envDevDeleteUsersFlightTicket = async () => {
    try {
      const response = await fetch(
        `https://final-project-sqlv.onrender.com/api/devEnv/deleteUsersFlightsTickets`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "667e745b85bee8cf5b8c3253" }),
        }
      );
      const data = await response.json();
      console.log("FullTripDATA!", data);
    } catch (error) {
      console.log("Error FullTrip", error.message);
    }
  };

  return (
    <PageFrame>
      <Button title="Activate Card" onPress={fetchFlightDetails} />
      <Button title="Delete user's flight ticket" onPress={envDevDeleteUsersFlightTicket} />
      {isDataFetched && detailedFlightTickets.length > 0 ? (
        <CardsSlide
          flightTickets={detailedFlightTickets}
          daysArray={daysArray}
        />
      ) : (
        <Text>Full trip page</Text>
      )}
    </PageFrame>
  );
};

export default FullTrip;

const styles = StyleSheet.create({});
