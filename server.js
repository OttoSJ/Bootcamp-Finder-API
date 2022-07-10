// Dependencies
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

// Load env vars
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')

// const logger = require('./middleware/logger') //example of custom middleware (not in use)

// Configure endpoint prefix's
const app = express()

// Body Parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())

// Dev Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// File uploading
app.use(fileupload())

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet({ contentSecurityPolicy: false }))

//Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // <-- 10 minutes
  max: 100,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler) // ** Must be under the routes **

// Run server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray
      .underline
  )
)
