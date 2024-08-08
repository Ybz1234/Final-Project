import { Request, Response } from "express";

import { spawn } from "child_process";
import { getAll, getById, createUser, update, deleteByIdM, findUserByEmailAndPasswordM, registerUserM } from "./user.model";
import { ObjectId } from "mongodb";

export async function testy(req: Request, res: Response) {
  res.status(200).json({ message: "hello" });
}
export async function getAllUsers(req: Request, res: Response) {
  try {
    let users = await getAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    let { id } = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    if (id.length != 24) {
      return res.status(403).json({ message: "id is required" });
    }

    let user = await getById(new ObjectId(id));
    console.log("controller", user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    let user = req.body;
    if (!user) {
      return res.status(403).json({ message: "user is required" });
    }
    let result = await createUser(user.firstName, user.lastName, user.email);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    let { id } = req.params;
    let user = req.body;
    if (!user || !id) {
      return res
        .status(403)
        .json({ message: "User ID and update data are required" });
    }
    let result = await update(id, user);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(403).json({ message: "User ID is required" });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    if (id.length !== 24) {
      return res.status(400).json({ message: "ID must be 24 characters long" });
    }

    const result = await deleteByIdM(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function signInUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmailAndPasswordM(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function signUpUser(req: Request, res: Response) {
  console.log("controller sign up");

  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role: "user",
    };

    const result = await registerUserM(newUser);

    // Call the Python script after successful registration
    const pythonProcess = spawn('python', ['C:/Users/jonat/Final-Project/Python/main.py', email, firstName]);
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script error: ${data}`);
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}
