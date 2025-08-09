const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ CORS Configuration for Production
const allowedOrigins = ['https://yourfrontend.com', 'http://localhost:5500']; // Add your real frontend URL

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

sequelize.sync()
  .then(() => console.log('Database connected & synced'))
  .catch(err => console.error('DB connection error:', err));

app.listen(3000, () => console.log('Server running on port 3000'));
