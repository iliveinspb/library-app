import type { Request, Response } from 'express'

const error404 = (_req: Request, res: Response): void => {
  res.status(404)
  res.json('404 | страница не найдена')
}

export default error404
