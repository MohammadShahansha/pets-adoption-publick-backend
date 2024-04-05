"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_route_1 = require("../modules/Register/register.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const pets_routes_1 = require("../modules/Pets/pets.routes");
const adoptionReq_routes_1 = require("../modules/AdoptionRequest/adoptionReq.routes");
const user_routes_1 = require("../modules/User/user.routes");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/register",
        route: register_route_1.registerRoutes,
    },
    {
        path: "/login",
        route: auth_route_1.authRouter,
    },
    {
        path: "/pets",
        route: pets_routes_1.petRoutes,
    },
    {
        path: "/",
        route: adoptionReq_routes_1.adoptionReqRouter,
    },
    {
        path: "/profile",
        route: user_routes_1.userRoutes,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
