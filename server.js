// Dependencies
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')

// Load env vars
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Route files
const bootcamp = require('./routes/bootcamps')

const logger = require('./middleware/logger') //example of custom middleware (not in use)

// Configure endpoint prefix's
const app = express()

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Mount Routers
app.use('/api/v1/bootcamps', bootcamp)

// Run server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray
      .underline
  )
)
