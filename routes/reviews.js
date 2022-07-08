const express = require('express')
const { getReviews, getReview } = require('../controllers/reviews')

const Review = require('../models/Review')

const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

// API prefix ==> /api/v1/courses

// Merging url from bootcamp re-routed resources
const router = express.Router({ mergeParams: true })

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
)

module.exports = router