const express = require('express');

const authRoutes = require('./authRoutes');
const paymentPlanRoutes = require('./paymentPlanRoutes');
const reviewRoutes = require('./reviewRoutes');
const twilioRoutes = require('./twilioRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/payment-plans', paymentPlanRoutes);
router.use('/reviews', reviewRoutes);
router.use('/twilio', twilioRoutes);

module.exports = router;
