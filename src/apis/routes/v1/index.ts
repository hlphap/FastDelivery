import express from "express";

//  Import route
import userRouter from "./users";
import dvMethodRouter from "./dvmethods";
import bankRouter from "./banks";
import cmStoreRouter from "./cmstores";

const router = express.Router();

const v1Router = [
    {
        path: "/v1/users",
        route: userRouter,
    },
    {
        path: "/v1/dvmethods",
        route: dvMethodRouter,
    },
    {
        path: "/v1/banks",
        route: bankRouter,
    },
    {
        path: "/v1/cmstores",
        route: cmStoreRouter,
    },
];

v1Router.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
