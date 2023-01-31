import { Request, Response } from "express";
import fs from "node:fs";

const userDataPath = `${__dirname}/../../userData.json`;

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
