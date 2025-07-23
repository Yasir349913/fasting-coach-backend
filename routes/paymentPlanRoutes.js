const express = require('express');
const {
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/paymentPlanController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddlerware');

const router = express.Router();

// Apply auth + admin protection to all routes
router.use(authMiddleware, adminOnly);

router.route('/').get(getPlans).post(addPlan);

router.route('/:id').patch(updatePlan).delete(deletePlan);

module.exports = router;
