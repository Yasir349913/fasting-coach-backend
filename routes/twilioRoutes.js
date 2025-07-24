const express = require('express');
const { handleIncomingMessage } = require('../controllers/twillio.controller');
const router = express.Router();

router.route('/webhook').post(handleIncomingMessage);

module.exports = router;
