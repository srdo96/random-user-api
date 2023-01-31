import express from "express";
import * as userController from "../../controllers/user.controller";

const route = express.Router();

route.get("/random", userController.getRandomUser);

export default route;