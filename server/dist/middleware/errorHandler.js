"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.HttpError = void 0;
class HttpError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
const errorHandler = (err, _req, res, _next) => {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err.message || 'Something went wrong';
    if (process.env.NODE_ENV !== 'test') {
        console.error(err);
    }
    res.status(status).json({ message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map