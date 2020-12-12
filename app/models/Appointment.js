const Sequelize = require('sequelize');

const db = require('../config/db');

const Appointment = db.define('appointment', {
    date: {
        type: Sequelize.STRING
    },
    time: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.INTEGER
    },
    package: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    addedBy: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.TIME
    },
    updatedAt: {
        type: Sequelize.TIME
    }


})

module.exports = Appointment;