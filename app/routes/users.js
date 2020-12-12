const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
require('dotenv').config()
var saltRounds = parseInt(process.env.SALT_ROUNDS);


// Get all Users
router.get('/', async (req, res) => {  
    try {
        const users = await User.findAll({
            attributes: {exclude: ['password']}
        })
        res.json({success: true, message: 'Success', data: users})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

// Add a user
router.post('/add', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        try {
            const data = req.body;
            const create = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: hash,
            admin: data.admin
            })  
      res.json({success: true, message: `Added ${create.firstName} to Database`})
    } catch (error) {
        res.status(500).send({success: false, message: 'Server Error ' + error.message})
    }
    });
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
            res.json({success: true, message: `${data.firstName}'s profile udpated.`})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})

// Delete User 
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({
            where: {
                id: id
            }
        })
        res.json({success: true, message: `Deleted user from database`})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error ' + error.message})
    }
})


module.exports = router;