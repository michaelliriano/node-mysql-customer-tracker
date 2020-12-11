const express = require('express');
const router = express.Router();
const db = require('../config/db')
const Customer = require('../models/Customer')

// Get all Users


router.get('/', async (req, res) => {
    try {
        const customer = await Customer.findAll()
        res.json(customer)
    } catch (error) {
        console.log(error)
    }
})

// Add a user

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const create = await Customer.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
    })
    console.log(create)
    res.send('created user')
    } catch (error) {
        console.log(error)
    }
})

// Edit User 
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updated = await Customer.update(
            {firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone},
            {where: {id: id}}
            )
        console.log(updated)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;