import { Request, Response } from "express";

export async function findAllFlights(req: Request, res: Response) {
  res.json([
    { firstName: "momo", planet: "epsilon" },
    { firstName: "kuku", planet: "zalter" },
  ]);
}

export async function registerFlights(req: Request, res: Request) {}
export async function loginFlights(req: Request, res: Request) {}
export async function updateFlights(req: Request, res: Request) {}
export async function deleteFlights(req: Request, res: Request) {}
