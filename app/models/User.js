const Sequelize = require('sequelize');

const db = require('../config/db');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

})

module.exports = User;