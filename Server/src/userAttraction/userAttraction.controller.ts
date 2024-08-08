import { Request, Response } from "express";

export async function findAllUserAttraction(req: Request, res: Response) {
  res.json([
    { firstName: "momo", planet: "epsilon" },
    { firstName: "kuku", planet: "zalter" },
  ]);
}

export async function registerUserAttraction(req: Request, res: Request) {}
export async function loginUserAttraction(req: Request, res: Request) {}
export async function updateUserAttraction(req: Request, res: Request) {}
export async function deleteUserAttraction(req: Request, res: Request) {}
