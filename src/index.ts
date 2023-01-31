// dependencies
import cors from "cors";
import express from "express";

// config
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the Random API");
});

app.listen(port, () => {
  console.log("Listing to port:", port);
});
