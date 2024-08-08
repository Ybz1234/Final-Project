import { Request, Response } from "express";

export async function findAllCountry(req: Request, res: Response) {
  res.json([
    { firstName: "momo", planet: "epsilon" },
    { firstName: "kuku", planet: "zalter" },
  ]);
}

export async function registerCountry(req: Request, res: Request) {}
export async function loginCountry(req: Request, res: Request) {}
export async function updateCountry(req: Request, res: Request) {}
export async function deleteCountry(req: Request, res: Request) {}
