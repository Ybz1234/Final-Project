import express from "express";
import "dotenv/config";
import UserRouter from "./user/user.routes";
import AdminRouter from "./admin/admin.routes";
import tripRouter from "./testapi/tripRoute";
import FlightTicketRouter from "./flightTicket/flightTicket.routes";
import AirportRouter from "./airport/airport.routes";
import hotelsRoutes from "./hotels/hotels.routes";
import attractionRecomendationRoutes from "./attractionRecomendation/attractionRecomendation.routes";
import devEnvRouter from "./DevEnv/devEnv.routes";
import cors from "cors";

const PORT = process.env.PORT || 1234;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", UserRouter);
app.use("/api/TripTicket", tripRouter);
app.use("/api/FlightTicket", FlightTicketRouter);
app.use("/api/Airports", AirportRouter);
app.use("/api/Hotels", hotelsRoutes);
app.use("/api/Attractions", attractionRecomendationRoutes);
app.use("/api/devEnv", devEnvRouter);
app.use("/api/admin", AdminRouter);

//listen to the defined port
app.listen(PORT, () => {
  console.log(`[SERVER] Server is live http://localhost:${PORT}`);
});
