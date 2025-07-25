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
    // const response = await twilioClient.messages.create({
    //   from: process.env.TWILIO_WHATSAPP_NUMBER,
    //   to: from,
    //   body: airesponse,
    // });

    res.status(200).json({ airesponse });
  } catch (error) {
    console.error('Twilio send error:', error.message);
    res.status(500).send('Error sending message');
  }
};

const sendQRCode = async (req, res) => {
  try {
    const twilioNumber = env.TWILIO_WHATSAPP_NUMBER.replace('whatsapp:', '');
    const message = encodeURIComponent('Hi, I want to start fasting 💪');
    const waLink = `https://wa.me/${twilioNumber}?text=${message}`;
    const qrDataUrl = await QRCode.toDataURL(waLink);

    // return an image (base64 format)
    const img = Buffer.from(qrDataUrl.split(',')[1], 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  } catch (error) {
    console.error('QR Code Generation Error:', err);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

module.exports = {
  handleIncomingMessage,
  sendQRCode,
};
