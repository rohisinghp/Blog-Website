const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../model/user');

const registration = '../views/layouts/register'

// GET register ADMIN registration

router.get('/register', async (req, res) => {
    try {
        const locals = {
            "title": "Admin Panel",
            "description": "Hello this is admin panel"
        }

        res.render('register/index', { locals, layout: registration })
    } 
    catch (error) {
        console.log(error);
    }
})

router.post('/register', async (req, res) => {

    try{
        const {username, password} = req.body;
        console.log(req.body);

        const hashedPassword = await bcrypt.hash(password , 10);
        try{
            const user = await User.create({username , password: hashedPassword})
            res.status(201).json({message : 'User Created', user})

        }catch(e){
            if(e.code === 11000){
                res.status(409).json({message : 'User already in use'});
            }
            res.status(500).json({message : 'Internal Server Error'});

        }

     }catch(error){
         console.log(error);
     }
})



module.exports = router;
