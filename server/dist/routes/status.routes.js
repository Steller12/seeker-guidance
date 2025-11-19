"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        service: 'Seeker Guidance API',
        status: 'ok',
        timestamp: Date.now(),
    });
});
exports.default = router;
//# sourceMappingURL=status.routes.js.map