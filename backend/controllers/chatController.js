const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message cannot be empty' });
    }

    const newMessage = await Message.create({ userId, message });

    res.status(201).json({ message: 'Message sent', data: newMessage });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    // Include user to get username along with message
    const messages = await Message.findAll({
      include: {
        model: User,
        attributes: ['username']
      },
      order: [['createdAt', 'ASC']]
    });

    // Format response
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      message: msg.message,
      createdAt: msg.createdAt,
      userId: msg.userId,
      username: msg.User.username
    }));

    res.json(formattedMessages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
