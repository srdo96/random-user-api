// dependencies
import cors from "cors";
import express from "express";

// config
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// home route
app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the Random-User-API");
});

// Route Not Found
app.all("*", (_req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log("Listing to port:", port);
});
