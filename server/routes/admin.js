
const express = require('express');
const router = express.Router();
const adminLogin ='../views/layouts/admin'
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const Post = require('../model/post')

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

// GET register ADMIN registration

// const registration = '../views/layouts/register'

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


router.get('/dashboard',authMiddleware, async (req,res) =>{

    try{
        const locals = {
                        "title": "DashBoard Panel",
                        "description": "Hello this is dashboard panel"
                 }

        const data = await Post.find();
        res.render('admin/dashboard',{
            locals,
            data,
            layout: adminLogin
        });

    }
    catch(e){
        console.log(e);
}
})

//Admin Create new post

router.get('/add-post',authMiddleware, async (req,res) =>{

    try{
        const locals = {
                        "title": "add post",
                        "description": "Hello this is create panel"
                 }

        res.render('admin/add-post',{
            locals,
            layout: adminLogin
        });

    }
    catch(e){
        console.log(e);
}
})

// admin insert that created post into the database

router.post('/add-post',authMiddleware, async (req,res) =>{

    try{
       console.log(req.body)

       try{
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body
        });

        await Post.create(newPost)
        res.redirect('/dashboard')

       }
       catch(e){
        console.log("database error during creating a new post", e);
       }
    }
    catch(e){
        console.log(e);
}
}) 

//Edit/Delete a Post

router.put('/edit-post/:id',authMiddleware, async (req,res) =>{

    try{
    
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
    });
    
    res.redirect(`/edit-post/${req.params.id}`);

    
        
    }
    catch(e){
        console.log(e);
}
})


router.get('/edit-post/:id',authMiddleware, async (req,res) =>{

    try{
    
     const data = await Post.findOne({_id : req.params.id});

     res.render('admin/edit-post',{
            layout: adminLogin,
            data
        });
    }
    catch(e){
        console.log(e);
}
})

router.delete('/delete-post/:id',authMiddleware, async (req,res) =>{

    try{
    
        await Post.deleteOne({_id: req.params.id})
    res.redirect('/dashboard')
    }
    catch(e){
        console.log(e);
}
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/')
})


 module.exports = router;
