const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses')

const { protect, authorize } = require('../middleware/auth')

const Course = require('../models/Course')
const advancedResults = require('../middleware/advancedResults')

// API prefix ==> /api/v1/courses

// Merging url from bootcamp re-routed resources
const router = express.Router({ mergeParams: true })

router.route('/').get(
  advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getCourses
)
router.route('/').post(protect, authorize('publisher', 'admin'), addCourse)
//
router.route('/:id').get(getCourse)
router.route('/:id').put(protect, authorize('publisher', 'admin'), updateCourse)
router
  .route('/:id')
  .delete(protect, authorize('publisher', 'admin'), deleteCourse)

module.exports = router
