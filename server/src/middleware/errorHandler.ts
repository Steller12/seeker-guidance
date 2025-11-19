import type { NextFunction, Request, Response } from 'express'

export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err instanceof HttpError ? err.status : 500
  const message = err.message || 'Something went wrong'
  if (process.env.NODE_ENV !== 'test') {
    console.error(err)
  }
  res.status(status).json({ message })
}


