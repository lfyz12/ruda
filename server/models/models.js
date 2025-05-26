const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// Модель сотрудников
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    departmentId: { type: DataTypes.INTEGER },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
}, { timestamps: false });

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: false });

const WorkSession = sequelize.define('WorkSession', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE },
}, { timestamps: false });

const TaskTimeLog = sequelize.define('TaskTimeLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    ticketId: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE },
}, { timestamps: false });

const Department = sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'open' },
    userId: { type: DataTypes.INTEGER, allowNull: false},
}, { timestamps: true });

const Device = sequelize.define('Device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    ipAddress: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.STRING, defaultValue: 'online' },
}, );

const DeviceUpdate = sequelize.define('DeviceUpdate', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    deviceId: { type: DataTypes.INTEGER, allowNull: false },
    explain: { type: DataTypes.STRING, allowNull: false },
    updateFile: { type: DataTypes.STRING, allowNull: false },
}, );


// ======== Связи ========

// User ↔ Token (один к одному)
User.hasOne(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

// User ↔ WorkSession (один ко многим)
User.hasMany(WorkSession, { foreignKey: 'userId', onDelete: 'CASCADE' });
WorkSession.belongsTo(User, { foreignKey: 'userId' });

// User ↔ TaskTimeLog (один ко многим)
User.hasMany(TaskTimeLog, { foreignKey: 'userId', onDelete: 'CASCADE' });
TaskTimeLog.belongsTo(User, { foreignKey: 'userId' });

// Ticket ↔ TaskTimeLog (один ко многим)
Ticket.hasMany(TaskTimeLog, { foreignKey: 'ticketId', onDelete: 'CASCADE' });
TaskTimeLog.belongsTo(Ticket, { foreignKey: 'ticketId' });

// Department ↔ User (один ко многим)
Department.hasMany(User, { foreignKey: 'departmentId', onDelete: 'SET NULL' });
User.belongsTo(Department, { foreignKey: 'departmentId' });

// User ↔ Ticket (один ко многим)
User.hasMany(Ticket, { foreignKey: 'userId', onDelete: 'CASCADE' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

// Device ↔ DeviceUpdate (один ко многим)
Device.hasMany(DeviceUpdate, { foreignKey: 'deviceId', onDelete: 'CASCADE' });
DeviceUpdate.belongsTo(Device, { foreignKey: 'deviceId' });


// ======== Экспорт моделей ========
module.exports = {
    User,
    Token,
    WorkSession,
    TaskTimeLog,
    Department,
    Ticket,
    Device,
    DeviceUpdate,
};
