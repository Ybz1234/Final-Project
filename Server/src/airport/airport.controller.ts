import { Request, Response } from "express";
import { getAirportByCityM, getAllAirports } from "./airport.model";
import { IAirPort } from "./airport.type";

export async function findAllAirport(req: Request, res: Response) {
  try {
    let airports = await getAllAirports();
    res.status(200).json({ airports });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getAirPortByCity(req: Request, res: Response) {
  try {
    let { city } = req.query as {
      city: string;
    };

    console.log("city", req.query);
    let airport = await getAirportByCityM(city);

    res.status(200).json({ airport });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function allAirportsNames(req: Request, res: Response) {
  try {
    let airports: any[] = await getAllAirports();

    let formattedAirports: IAirPort[] = airports.map((doc) => ({
      _id: doc._id,
      address: {
        full_address: doc.address.full_address,
        location: doc.address.location,
      },
      name: doc.name,
      city: doc.city,
      country: doc.country,
      iata: doc.iata,
      icao: doc.icao,
    }));

    let names = formattedAirports.map((airport) => ({
      city: airport.city,
      location: airport.address.location,
    }));
    res.status(200).json({ airports: names });
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function loginAirport(req: Request, res: Request) {}
export async function updateAirport(req: Request, res: Request) {}
export async function deleteAirport(req: Request, res: Request) {}
