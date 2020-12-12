const express = require('express');
const router = express.Router();
const db = require('../config/db')
const Customer = require('../models/Customer')
const User = require('../models/User')

// Get all Customers


router.get('/user/:id', async (req, res) => {
    try {
        Customer.belongsTo(User, {targetKey: 'id', foreignKey: 'addedBy'})
        const customer = await Customer.findAll({
            include: [{
                model: User,
                where: {
                    id: req.params.id
                },        
                attributes: {exclude: ['password','phone','createdAt','updatedAt']}
            },
        ],
        })
        res.json({success: true, message: 'Success', data: customer})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

// Add a Customer

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const create = await Customer.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        addedBy: data.addedBy
    })
    console.log(create)
    res.send('created user')
    } catch (error) {
        console.log(error)
    }
})

// Edit Customer 
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updated = await Customer.update(
            {firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone},
            {where: {id: id}}
            )
            res.json({success: true, message: `${data.firstName}'s profile udpated.`})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

// Delete Customer 
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Customer.destroy({
            where: {
                id: id
            }
        })
        res.json({success: true, message: `Deleted Customer from database`})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})



module.exports = router;