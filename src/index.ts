/* eslint-disable import/no-unresolved */
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router as authRouter } from './routes/auth.routes'
import { router as userRouter } from './routes/user.router'
import { router as storeRouter } from './routes/store.router'
// import { router as reviewRouter } from './routes/review';
import 'colors'
import { connectDb } from './config/db'
import { errorHandler } from './middleware/errorHandler'

const app: Application = express()
const port = process.env.PORT || 5000
app.use(cors())
connectDb()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/stores', storeRouter)
// app.use('/api/review', reviewRouter);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`port is running on port ${port}`.bgBlue.white)
})
