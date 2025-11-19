import type { NextFunction, Request, Response } from 'express';
export declare class HttpError extends Error {
    status: number;
    constructor(status: number, message: string);
}
export declare const errorHandler: (err: Error, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map