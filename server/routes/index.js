const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const workSessionRouter = require('./workSessionRouter')
const taskRouter = require('./taskRouter')
const taskTimeLogRouter = require('./taskTimeLogRouter')
const departmentRouter = require('./departmentRouter')
const deviceRouter = require('./deviceRouter')
const deviceUpdateRouter = require('./deviceUpdateRouter')

router.use('/user', userRouter)
router.use('/department', departmentRouter)
router.use('/device', deviceRouter)
router.use('/deviceUpdate', deviceUpdateRouter)
router.use('/workSession', workSessionRouter)
router.use('/ticket', taskRouter)
router.use('/taskTimeLog', taskTimeLogRouter)

module.exports = router