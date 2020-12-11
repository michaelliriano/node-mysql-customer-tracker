const express = require('express');
const router = express.Router();
const db = require('../config/db')
const User = require('../models/User')

// Get all Users


router.get('/', async (req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

// Add a user

router.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const create = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        admin: data.admin
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
        const updated = await User.update(
            {firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone},
            {where: {id: id}}
            )
        console.log(updated)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;