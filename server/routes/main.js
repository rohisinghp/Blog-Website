
const express = require('express');
const router = express.Router();


router.get('', (req,res) =>{
    const locals = {
        "title": "nodeJS Blog",
        "description": "Using Nodejs, Express , MongoDB"
    }
    res.render('index', {locals});
})
router.get('/about', (req,res) =>{
    res.render('about');
})

module.exports = router;
