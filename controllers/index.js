const { login } = require('./auth.controller');
const {
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
} = require('./paymentPlan.controller');
const {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} = require('./review.controller');
const { handleIncomingMessage } = require('./twillio.controller');

module.exports = {
  login,
  getPlans,
  addPlan,
  updatePlan,
  deletePlan,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
  handleIncomingMessage,
};
