import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import axios from 'axios';
import * as dotenv from 'dotenv';
import { getAll, getById, createUser, update, deleteByIdM, findUserByEmailAndPasswordM, registerUserM } from "./user.model";
import { generateToken, authenticateToken } from "./auth.utils";
dotenv.config();

const DB_INFO = {
  connectionString: process.env.CONNECTION_STRING,
  db: process.env.DB_NAME,
};

const collection = "users";
const PYTHON_UTILITY_SERVER_URL = "https://utilityserver-sa7p.onrender.com";

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

export async function signOutUser(req: Request, res: Response) {
  res.status(200).json({ message: "You have been signed out successfully." });
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

    const token = generateToken(user._id.toString());
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function signUpUser(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminEmails = new Set(['inonv31@gmail.com', 'jonathanbz49@gmail.com']);
    const role = adminEmails.has(email) ? "admin" : "user";

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    const result = await registerUserM(newUser);

    await Promise.all([
      sendEmail(email, firstName),
      exportToCsv('output_file.csv'),
      exportToExcel('output_file.xlsx')
    ]);

    const token = generateToken(result.insertedId.toString());
    console.log("token", token);
    
    res.status(201).json({ result, token });
  } catch (error) {
    console.error('Error in sign up:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}

async function sendEmail(email: string, firstName: string): Promise<void> {
  try {
    const response = await axios.post(`${PYTHON_UTILITY_SERVER_URL}/routes/send_welcome_email`, {
      to_email: email,
      user_name: firstName
    });
    console.log(`Email script output: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`Email script error: ${error}`);
  }
}

async function exportToCsv(outputFile: string): Promise<void> {
  try {
    const response = await axios.post(`${PYTHON_UTILITY_SERVER_URL}/export/export_csv`, {
      connection_string: process.env.CONNECTION_STRING,
      db_name: process.env.DB_NAME,
      collection_name: collection,
      output_file: outputFile
    });
    console.log(`CSV export script output: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`CSV export script error: ${error}`);
  }
}

async function exportToExcel(outputFile: string): Promise<void> {
  try {
    const response = await axios.post(`${PYTHON_UTILITY_SERVER_URL}/export/export_excel`, {
      connection_string: process.env.CONNECTION_STRING,
      db_name: process.env.DB_NAME,
      collection_name: 'users',
      output_file: outputFile
    });
    console.log(`Excel export script output: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(`Excel export script error: ${error}`);
  }
}
