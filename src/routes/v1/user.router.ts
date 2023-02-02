import express from "express";
import * as userController from "../../controllers/user.controller";
import rateLimiter from "../../middleware/limiter";

const route = express.Router();
route.get("/random", userController.getRandomUser);
route.get("/all", rateLimiter, userController.getAllUser);
route.post("/save", userController.saveUser);
route.patch("/update/:userId", userController.updateUserInfo);
route.delete("/delete/:userId", userController.deleteUser);

export default route;
