import { Request, Response } from "express";
import { getAllAttractionsM, getAttractionByCityM, getAttractionM } from "./attractionRecomendation.model";

export async function findAllAttractionRecomendations(req: Request, res: Response){
  try {
    let attractions = await getAllAttractionsM();
    res.status(200).json({ attractions });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function findAttractionRecomendation(req: Request, res: Response) {
  try {
    let attraction = await getAttractionM();
    res.status(200).json({ attraction });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function findAttractionsByCity(req: Request, res: Response) {
  try {
    let { city } = req.body;
    let attractions = await getAttractionByCityM(city);
    console.log("controller", attractions);
    res.status(200).json({ attractions });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function registerattractionRecomendation(
  req: Request,
  res: Request
) {}
export async function loginattractionRecomendation(
  req: Request,
  res: Request
) {}
export async function updateattractionRecomendation(
  req: Request,
  res: Request
) {}
export async function deleteattractionRecomendation(
  req: Request,
  res: Request
) {}
