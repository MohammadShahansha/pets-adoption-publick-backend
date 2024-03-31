import express from "express";
import { userRoutes } from "../modules/users/user.route";
import { authRouter } from "../modules/Auth/auth.route";

const router = express.Router();
const moduleRoute = [
  {
    path: "/register",
    route: userRoutes,
  },
  {
    path: "/login",
    route: authRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
