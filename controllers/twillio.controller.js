const { generateReply } = require('../utils/gptClient');

const handleIncomingMessage = async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body;

  try {
    const airesponse = await generateReply(body);
    // const response = await client.messages.create({
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

module.exports = {
  handleIncomingMessage,
};
