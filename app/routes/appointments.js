const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Customer = require('../models/Customer');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.findAll()
        res.json({success: true, length: appointments.length, data: appointments})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

// Get all Customers


router.get('/customer', async (req, res) => {
    try {
        Appointment.belongsTo(Customer, {targetKey: 'id', foreignKey: 'name'})
        Appointment.belongsTo(User, {targetKey: 'id', foreignKey: 'addedBy'})
        const appointment = await Appointment.findAll({
            include: [
                {
                model: Customer,
                where: {
                    id: req.query.customer
                },        
            },
            {
                model: User,
                where: {
                    id: req.query.employee,
                },
                attributes: {exclude: ['password','phone','createdAt','updatedAt']}
            }
        ],
        })
        res.json({success: true, message: 'Success',total_Appointments: appointment.length, data: appointment})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

module.exports = router;