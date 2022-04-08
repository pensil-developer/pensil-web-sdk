"use strict";
/// <reference path="index.d.ts" />
/// <reference path=""
Object.defineProperty(exports, "__esModule", { value: true });
exports.PensilApp = exports.UIKit = exports.PensilService = void 0;
var services_1 = require("./services");
Object.defineProperty(exports, "PensilService", { enumerable: true, get: function () { return services_1.PensilService; } });
var ui_1 = require("./ui");
Object.defineProperty(exports, "UIKit", { enumerable: true, get: function () { return ui_1.UIKit; } });
var pensil_app_container_1 = require("./ui/container/pensil-app.container");
Object.defineProperty(exports, "PensilApp", { enumerable: true, get: function () { return pensil_app_container_1.PensilApp; } });
