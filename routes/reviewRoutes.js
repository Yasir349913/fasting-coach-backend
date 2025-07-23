const express = require('express');
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddlerware');

const router = express.Router();

// Apply auth + admin middleware to all review routes
router.use(authMiddleware, adminOnly);

router.route('/').get(getReviews).post(addReview);

router.route('/:id').patch(updateReview).delete(deleteReview);

module.exports = router;
