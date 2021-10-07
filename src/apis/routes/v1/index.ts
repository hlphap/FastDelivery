import express from 'express';

//  Import route
import userRouter from './users';
import dvMethodRouter from './dvmethods';
import bankRouter from './banks';
import cmStoreRouter from './cmstores';
import cmStaffRouter from './cmstaffs';
import districtRouter from './districts';
import warehouseRouter from './warehouses';
import statusRouter from './status';
import typeStaffRouter from './typestaffs';
import storeRouter from './stores';
import staffRouter from './staffs';
import orderRouter from './orders';

const router = express.Router();

const v1Router = [
    {
        path: '/v1/users',
        route: userRouter,
    },
    {
        path: '/v1/dvmethods',
        route: dvMethodRouter,
    },
    {
        path: '/v1/banks',
        route: bankRouter,
    },
    {
        path: '/v1/cmstores',
        route: cmStoreRouter,
    },
    {
        path: '/v1/cmstaffs',
        route: cmStaffRouter,
    },
    {
        path: '/v1/districts',
        route: districtRouter,
    },
    {
        path: '/v1/warehouses',
        route: warehouseRouter,
    },
    {
        path: '/v1/status',
        route: statusRouter,
    },
    {
        path: '/v1/typestaffs',
        route: typeStaffRouter,
    },
    {
        path: '/v1/stores',
        route: storeRouter,
    },
    {
        path: '/v1/staffs',
        route: staffRouter,
    },
    {
        path: '/v1/orders',
        route: orderRouter,
    },
];

v1Router.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
