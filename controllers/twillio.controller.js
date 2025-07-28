const { generateReply } = require('../utils');
const { twilioClient } = require('../config');
const QRCode = require('qrcode');
const { env } = require('../config');

const handleIncomingMessage = async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;

  const phone = '+' + from.split('+')[1];
  console.log(phone);

  try {
    const airesponse = await generateReply(body);
    const response = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: from,
      body: airesponse,
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error('Twilio send error:', error.message);
    res.status(500).send('Error sending message');
  }
};

const sendQRCode = async (req, res) => {
  try {
    const twilioNumber = env.TWILIO_WHATSAPP_NUMBER.replace('whatsapp:', '');
    const joinCode = `join ${env.TWILIO_JOIN_CODE}`;
    const encodedMessage = encodeURIComponent(joinCode);
    const waLink = `https://wa.me/${twilioNumber}?text=${encodedMessage}`;

    const qrDataUrl = await QRCode.toDataURL(waLink);

    const img = Buffer.from(qrDataUrl.split(',')[1], 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  } catch (error) {
    console.error('QR Code Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate WhatsApp QR code' });
  }
};

module.exports = {
  handleIncomingMessage,
  sendQRCode,
};
