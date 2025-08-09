const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Message = sequelize.define('Message', {
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Associate Message with User (many messages per user)
Message.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Message, { foreignKey: 'userId' });

module.exports = Message;
