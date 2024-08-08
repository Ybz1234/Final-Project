import { Router } from "express";
import {
  findAllAttractionRecomendations,
  findAttractionRecomendation,
  findAttractionsByCity,
} from "./attractionRecomendation.controller";
const attractionRecomendationRouter = Router();

export default attractionRecomendationRouter
  .get("/findAllAttractionRecomendations", findAllAttractionRecomendations)
  .get("/findAttractionRecomendation", findAttractionRecomendation)
  .get("/findAttractionsByCity", findAttractionsByCity);
