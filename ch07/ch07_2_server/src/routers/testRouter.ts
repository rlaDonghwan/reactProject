import type { MongoDB } from '../mongodb'
import { Router } from 'express'
import { getUserIdFromJwtP } from './getUserIdFromJwtP'

export const testRouter = (...args: any[]) => {
  const db: MongoDB = args[0]
  const test = db.collection('test')
  const router = Router()
  return router
    .get('/', async (req, res) => {
      try {
        const userId = await getUserIdFromJwtP(req)
        const findResult = await test.find({}).toArray()
        res.json({ ok: true, body: findResult })
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
    .get('/:id', async (req, res) => {
      const { id } = req.params
      try {
        const userId = await getUserIdFromJwtP(req)
        const findResult = await test.findOne({ id })
        res.json({ ok: true, body: findResult })
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
    .post('/', async (req, res) => {
      const { body } = req
      try {
        const userId = await getUserIdFromJwtP(req)
        try {
          await test.drop() // 항상 id: '1234'인 문서가 단 하나만 있도록
        } catch (e) {
          /* 에러 무시 */
        }

        // 과거 문서들을 모두 지움(보통의 경우는 필요 없는 코드)
        const insertResult = await test.insertOne({ id: '1234', ...body })
        const { insertedId } = insertResult
        const findResult = await test.findOne({ _id: insertedId })
        res.json({ ok: true, body: findResult })
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
    .post('/user', async (req, res) => {
      const { id, email, password } = req.body
      try {
        const userId = await getUserIdFromJwtP(req)
        const insertResult = await db
          .collection('users')
          .insertOne({ id, email, password })
        const { insertedId } = insertResult
        const findResult = await db
          .collection('users')
          .findOne({ _id: insertedId })
        res.json({ ok: true, body: findResult })
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
    .put('/:id', async (req, res) => {
      const { id } = req.params
      const { body } = req
      try {
        const userId = await getUserIdFromJwtP(req)
        const updateResult = await test.findOneAndUpdate(
          { id },
          { $set: body },
          {
            returnDocument: 'after',
          }
        )
        if (updateResult && updateResult.value) {
          res.json({ ok: true, body: updateResult.value })
        } else {
          res
            .status(404)
            .json({ ok: false, message: 'Update result not found' })
        }
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
    .delete('/:id', async (req, res) => {
      const { id } = req.params
      try {
        const userId = await getUserIdFromJwtP(req)
        await test.deleteOne({ id })
        res.json({ ok: true })
      } catch (e) {
        if (e instanceof Error) res.json({ ok: false, errorMessage: e.message })
      }
    })
}
