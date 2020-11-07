"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
var AdGetAllAction_1 = require("./controller/AdGetAllAction");
var AdGetByIdAction_1 = require("./controller/AdGetByIdAction");
var AdSaveAction_1 = require("./controller/AdSaveAction");
var AdModifyAction_1 = require("./controller/AdModifyAction");
var AdDeleteAction_1 = require("./controller/AdDeleteAction");
var HealthCheck_1 = require("./controller/HealthCheck");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/",
        method: "get",
        action: HealthCheck_1.healthCheck
    },
    {
        path: "/ads",
        method: "get",
        action: AdGetAllAction_1.adGetAllAction
    },
    {
        path: "/ads",
        method: "post",
        action: AdSaveAction_1.adSaveAction
    },
    {
        path: "/ads/:id",
        method: "get",
        action: AdGetByIdAction_1.adGetByIdAction
    },
    {
        path: "/ads/:id",
        method: "put",
        action: AdModifyAction_1.adModifyAction
    },
    {
        path: "/ads/:id",
        method: "delete",
        action: AdDeleteAction_1.adDeleteAction
    }
];
