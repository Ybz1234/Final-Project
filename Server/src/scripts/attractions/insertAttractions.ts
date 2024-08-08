import "dotenv/config";
import { attractionRecomendations } from "../../data/attraction";
import { addAttraction } from "../../attractionRecomendation/attractionRecomendation.model";

export const insertAttractions = async () => {
  for (let i = 0; i < attractionRecomendations.length; i++) {
    await addAttraction(attractionRecomendations[i]);
    console.log("new attraction created", attractionRecomendations[i].name);
  }
  console.log("DONE");
};

insertAttractions();
