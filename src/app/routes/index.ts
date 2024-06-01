import express from "express";
import { registerRoutes } from "../modules/Register/register.route";
import { authRouter } from "../modules/Auth/auth.route";
import { petRoutes } from "../modules/Pets/pets.routes";
import { adoptionReqRouter } from "../modules/AdoptionRequest/adoptionReq.routes";
import { userRoutes } from "../modules/User/user.routes";
import { reviewRoutes } from "../modules/Review/review.route";
import { postRoutes } from "../modules/Post/post.router";

const router = express.Router();
const moduleRoute = [
  {
    path: "/",
    route: registerRoutes,
  },
  {
    path: "/",
    route: authRouter,
  },
  {
    path: "/",
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
  {
    path: "/",
    route: reviewRoutes,
  },
  {
    path: "/",
    route: postRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
