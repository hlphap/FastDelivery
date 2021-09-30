import express from "express";

//  Import route
import userRouter from "./users";
import authRouter from "./auths";

const router = express.Router();

const v1Router = [
    {
        path: "/v1/users",
        route: userRouter,
    },
    {
        path: "/v1/auth",
        route: authRouter,
    },
];

v1Router.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
