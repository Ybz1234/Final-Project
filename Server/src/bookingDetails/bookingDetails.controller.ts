import { Request, Response } from "express";

export async function findAllBookingDetails(req: Request, res: Response) {
  res.json([
    {
      id: 1,
      firstName: "momo",
      lastName: "epsilon",
      mailAddress: "wallaYalla@Vamos.Kadima",
    },
    { firstName: "kuku", planet: "zalter" },
  ]);
}

export async function registerBookingDetails(req: Request, res: Request) {}
export async function loginBookingDetails(req: Request, res: Request) {}
export async function updateBookingDetails(req: Request, res: Request) {}
export async function deleteBookingDetails(req: Request, res: Request) {}
