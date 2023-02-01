import { Request, Response } from "express";
import fs from "node:fs";

const userDataPath = `${__dirname}/../../userData.json`;

//Method: GET, endpoint: /user/random
export const getRandomUser = async (_req: Request, res: Response) => {
  try {
    // read userData file
    const stringData = await fs.promises.readFile(userDataPath, "utf-8");
    const data: [] = JSON.parse(stringData);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomUser = data[randomIndex];
    res.status(200).send(randomUser);
  } catch (error: unknown) {
    // Not Found error
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      res.status(404).send("File Not Found");
    } else {
      // other error
      res.status(500).send("Unexpected Error");
    }
  }
};

// Method: GET, endpoint: /user/all
export const getAllUser = async (_req: Request, res: Response) => {
  try {
    const data: string = await fs.promises.readFile(userDataPath, "utf-8");
    res.status(200).send(data);
  } catch (error: unknown) {
    // File Not Found
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      res.status(404).send("File Not Found");
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};

/**
 * saveUser - A function to save user data to userData.json file
 * Method: POST, endpoint: /user/save
 */
export const saveUser = async (req: Request, res: Response) => {
  // user type definition
  interface UserData {
    id: number;
    gender: string;
    name: string;
    contact: string;
    address: string;
    photoUrl: string;
  }

  try {
    const user: UserData = req.body;
    const allUserDataString = await fs.promises.readFile(userDataPath, "utf-8");
    const allUser: UserData[] = JSON.parse(allUserDataString);
    allUser.push(user);
    await fs.promises.writeFile(userDataPath, JSON.stringify(allUser));
    res.status(200).send("User added successfully");
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      console.error(error);
      res.status(400).send("Invalid JSON data");
    } else if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      res.status(404).send("File Not Found");
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
};
