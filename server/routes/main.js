
const express = require('express');
const router = express.Router();
const Post = require('../model/post')


router.get('', (req,res) =>{
    const locals = {
        "title": "nodeJS Blog",
        "description": "Using Nodejs, Express , MongoDB"
    }
    res.render('index', {locals});
})

function insertData(){
    Post.insertMany([
        {
            title: 'Building a blog',
            body: "this is the body text"
        },
        {
            title: 'Building a blog-2',
            body: "this is the body text"
        },  
        {
            title: 'Building a blog-3',
            body: "this is the body text" 
        },
        {
            title: 'Building a blog-4',
            body: "this is the body text"
        },
    ])
}
insertData();


router.get('/about', (req,res) =>{
    res.render('about');
})

module.exports = router;
