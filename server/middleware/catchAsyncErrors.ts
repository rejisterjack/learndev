import type { NextFunction, Request, Response } from "express"

const CatchAsyncError =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export default CatchAsyncError
