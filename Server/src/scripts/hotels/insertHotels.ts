import { hotels } from "../../data/hotels";
import { addHotel } from "../../hotels/hotels.model";

export const insertHotels = async () => {
  for (let i = 0; i < hotels.length; i++) {
    await addHotel(hotels[i]);
    console.log("new hotel created", hotels[i].name);
  }
  console.log("DONE");
};

insertHotels();
