const express = require('express')
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews')

const Review = require('../models/Review')

const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

// API prefix ==> /api/v1/courses

// Merging url from bootcamp re-routed resources
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview)

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview)

module.exports = router
