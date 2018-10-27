"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
exports.app = express();
exports.default = exports.app;
require("./modules/module-debug");
require("./modules/module-config");
require("./modules/module-dev");
// import "./modules/module-accesspoints"
require("./modules/module-dummy");
exports.app.listen(config_1.default.port || 8080, () => console.log("Server is online"));
