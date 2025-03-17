import { Router } from 'express'

export const testRouter = (...args: any[]) => {
  const router = Router()
  return router
    .get('/', (req, res) => {
      res.json({ ok: true })
    })
    .get('/:id', (req, res) => {
      const { id } = req.params
      res.json({ ok: true, id })
    })
    .post('/', (req, res) => {
      const { body } = req
      res.json({ ok: true, body })
    })
    .put('/:id', (req, res) => {
      const { id } = req.params
      const { body } = req
      res.json({ ok: true, id, body })
    })
    .delete('/:id', (req, res) => {
      const { id } = req.params
      res.json({ ok: true, id })
    })
}
