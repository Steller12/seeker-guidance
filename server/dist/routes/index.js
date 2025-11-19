"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const status_routes_1 = __importDefault(require("./status.routes"));
const suggestions_routes_1 = __importDefault(require("./suggestions.routes"));
const router = (0, express_1.Router)();
router.use("/status", status_routes_1.default);
router.use("/suggestions", suggestions_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map