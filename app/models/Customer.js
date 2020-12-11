const Sequelize = require('sequelize');

const db = require('../config/db');

const Customer = db.define('customer', {
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
    customerSince: {
        type: Sequelize.STRING
    },
    addedBy: {
        type: Sequelize.INTEGER
    }

})

module.exports = Customer;