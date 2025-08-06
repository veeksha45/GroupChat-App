const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing DB:', err));

app.listen(3000, () => console.log('Server running on port 3000'));
