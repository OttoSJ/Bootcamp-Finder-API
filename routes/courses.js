const express = require('express')
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses')

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
router.route('/').post(addCourse)
//
router.route('/:id').get(getCourse)
router.route('/:id').put(updateCourse)
router.route('/:id').delete(deleteCourse)

module.exports = router