import { Request, Response } from "express";
import fs from "node:fs";

export const getRandomUser = async (_req: Request, res: Response) => {
  try {
    // read userData file
    const rawData = await fs.promises.readFile(
      `${__dirname}/../../userData.json`,
      "utf-8"
    );
    const data: [] = JSON.parse(rawData);
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
