import { Request, Response } from "express";

export async function findAllCity(req: Request, res: Response) {
  res.json([
    { firstName: "momo", planet: "epsilon" },
    { firstName: "kuku", planet: "zalter" },
  ]);
}

export async function registerCity(req: Request, res: Request) {}
export async function loginCity(req: Request, res: Request) {}
export async function updateCity(req: Request, res: Request) {}
export async function deleteCity(req: Request, res: Request) {}
