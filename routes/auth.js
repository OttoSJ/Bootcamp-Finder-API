const express = require('express')
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/auth')

const { protect } = require('../middleware/auth')

const router = express.Router()

// Prefix for this route = /api/v1/auth/

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgotpassword', forgotPassword)
router.put('/updateuserdetails', protect, updateDetails)
router.put('/updatepassword', protect, updatePassword)
router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
