import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { spawn } from "child_process";
import * as path from 'path';
import * as dotenv from 'dotenv';
import { getAll, getById, createUser, update, deleteByIdM, findUserByEmailAndPasswordM, registerUserM } from "./user.model";
import { generateToken, authenticateToken } from "./auth.utils";
dotenv.config();

const DB_INFO = {
  connectionString: process.env.CONNECTION_STRING,
  db: process.env.DB_NAME,
};
const collection = "users";

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

export async function signOutUser(req: Request, res: Response) {
  // This function is mainly for the client-side to clear their stored token
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

function runPythonScript(args: string[], callback: (data: Buffer) => void, errorCallback: (data: Buffer) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(__dirname, '../Python/main.py');
    const pythonProcess = spawn('python', [pythonScriptPath, ...args]);

    pythonProcess.stdout.on('data', (data) => {
      callback(data);
    });

    pythonProcess.stderr.on('data', (data) => {
      errorCallback(data);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

function sendEmail(email: string, firstName: string): Promise<void> {
  const args: string[] = [
    'send_email',
    email,
    firstName
  ];

  return runPythonScript(
    args,
    (data) => console.log(`Email script output: ${data}`),
    (data) => console.error(`Email script error: ${data}`)
  );
}

function exportToCsv(outputFile: string): Promise<void> {
  const args: string[] = [
    'export_csv',
    DB_INFO.connectionString ?? "",
    DB_INFO.db ?? "",
    collection,
    outputFile
  ];

  return runPythonScript(
    args,
    (data) => console.log(`CSV export script output: ${data}`),
    (data) => console.error(`CSV export script error: ${data}`)
  );
}

function exportToExcel(outputFile: string): Promise<void> {
  const args: string[] = [
    'export_excel',
    DB_INFO.connectionString ?? "",
    DB_INFO.db ?? "",
    collection,
    outputFile
  ];

  return runPythonScript(
    args,
    (data) => console.log(`Excel export script output: ${data}`),
    (data) => console.error(`Excel export script error: ${data}`)
  );
}
