import express from "express";
import { userRoutes } from "../modules/users/user.route";
import { authRouter } from "../modules/Auth/auth.route";
import { petRoutes } from "../modules/Pets/pets.routes";
import { adoptionReqRouter } from "../modules/AdoptionRequest/adoptionReq.routes";

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
  {
    path: "/pets",
    route: petRoutes,
  },
  {
    path: "/",
    route: adoptionReqRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
