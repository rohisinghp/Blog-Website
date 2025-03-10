
const express = require('express');
const router = express.Router();
const adminLogin ='../views/layouts/admin'
const User = require('../model/user');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../config/MiddleWare/Authentication')

const bcrypt = require('bcrypt')
const jwtSecret =process.env.JWT_SECRET

//GET redirect ADMIN  login

router.get('/admin',async (req,res) =>{
     
        try{
            const locals = {
                "title": "Admin Panel",
                "discription": "Hello this is admin panel"
            }
            res.render('admin/index', {locals, layout: adminLogin});

        }catch(error){
            console.log(error);
        }
    })

    //GET ADMIN Check login

    router.post('/admin',async (req,res) =>{
     
        try{
           const {username, password} = req.body;
         
           const user =await User.findOne({username});
           if(!user) return res.status(401).json("invalid creadentials ")

            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) return res.status(401).json("invalid Password ")

            // return res.status(201).json('Logged In')

            const token = jwt.sign({userId: user._id}, jwtSecret)
            res.cookie('token',token,{httpOnly : true})
            res.redirect('/dashboard')

        }catch(error){
            console.log(error);
        }
    })

    router.get('/dashboard',authMiddleware, async (req,res) =>{
        res.render('admin/dashboard')
    });


    const registration = '../views/layouts/register'



// GET register ADMIN registration

// -------------------although this is working perfectly okay but we have created a seperate route for restration ----------

// router.get('/register', async (req, res) => {
//     try {
//         const locals = {
//             "title": "Admin Panel",
//             "description": "Hello this is admin panel"
//         }

//         res.render('register/index', { locals, layout: registration })
//     } 
//     catch (error) {
//         console.log(error);
//     }
// })

    
 module.exports = router;
