// Dependencies
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')
// TO RUN SEVER = NPM RUN DEV

// Load env vars
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Route files
const bootcamp = require('./routes/bootcamps')

// const logger = require('./middleware/logger') //example of custom middleware (not in use)

// Configure endpoint prefix's
const app = express()

// Body parser
app.use(express.json())

// Dev Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Mount Routers
app.use('/api/v1/bootcamps', bootcamp)

app.use(errorHandler) // ** Must be under the routes **

// Run server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray
      .underline
  )
)
