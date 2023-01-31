import express from "express";
import * as userController from "../../controllers/user.controller";

const route = express.Router();

route.get("/random", userController.getRandomUser);
route.get("/all", userController.getAllUser);

export default route;
