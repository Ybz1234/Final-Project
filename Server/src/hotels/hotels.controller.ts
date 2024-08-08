import { Request, Response } from "express";
import { getAllHotelsM, getHotelsByCityM, getHotelByNameM } from "./hotels.model";

export async function findAllHotels(req: Request, res: Response) {
  try{
    let hotels = await getAllHotelsM();
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function findHotelByName(req: Request, res: Response) {
  try {
    let { name } = req.body;
    let hotel = await getHotelByNameM(name);
    console.log("controller", hotel);
    res.status(200).json({ hotel });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function findHotelsByCity(req: Request, res: Response) {
  try {
    let { city } = req.body;
    let hotel = await getHotelsByCityM(city);
    console.log("controller", hotel);
    res.status(200).json({ hotel });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function registerHotels(req: Request, res: Request) {}
export async function loginHotels(req: Request, res: Request) {}
export async function updateHotels(req: Request, res: Request) {}
export async function deleteHotels(req: Request, res: Request) {}
