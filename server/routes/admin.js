
const express = require('express');
const router = express.Router();
const adminLogin ='../views/layouts/admin'

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

    router.post('/admin',async (req,res) =>{
     
        try{
           const {username, password} = req.body;
        //    console.log(req.body);

            if(req.body.username === 'admin' && req.body.password === '123')
                res.status(200);
            else
                res.status(400)

        //    res.redirect('/admin')
        }catch(error){
            console.log(error);
        }
    })

 module.exports = router;
