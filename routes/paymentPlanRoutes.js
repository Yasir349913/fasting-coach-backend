const express = require('express');
const {
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/paymentPlanController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddlerware');

const router = express.Router();

router.route('/').get(getPlans);

// Apply auth + admin protection to all routes
router.use(authMiddleware, adminOnly);
router.route('/').post(addPlan);
router.route('/:id').patch(updatePlan).delete(deletePlan);

module.exports = router;
