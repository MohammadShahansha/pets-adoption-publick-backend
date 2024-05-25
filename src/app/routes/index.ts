import express from "express";
import { registerRoutes } from "../modules/Register/register.route";
import { authRouter } from "../modules/Auth/auth.route";
import { petRoutes } from "../modules/Pets/pets.routes";
import { adoptionReqRouter } from "../modules/AdoptionRequest/adoptionReq.routes";
import { userRoutes } from "../modules/User/user.routes";

const router = express.Router();
const moduleRoute = [
  {
    path: "/",
    route: registerRoutes,
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
  {
    path: "/",
    route: userRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
