require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const sequelize = require('./config/db');
const User = require('./models/User');
const Message = require('./models/Message');

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Protected route example: chat page (only accessible if logged in)
app.get('/chat.html', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Sequelize model associations
Message.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected & synced');
    app.listen(3000, () => console.log('Server running at http://localhost:3000'));
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });
