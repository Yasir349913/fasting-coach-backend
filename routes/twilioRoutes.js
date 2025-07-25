const express = require('express');
const { handleIncomingMessage, sendQRCode } = require('../controllers/index');
const router = express.Router();

router.route('/webhook').post(handleIncomingMessage);
router.route('/qr').get(sendQRCode);

module.exports = router;
