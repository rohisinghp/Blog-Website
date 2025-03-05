
const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const User = require('../model/user');


// router.get('',async (req,res) =>{
 
//     try{
//         const locals = {
//             "title": "nodeJS Blog",
//             "description": "Using Nodejs, Express , MongoDB"
//         }

//         let perPage = 6;
//         let page = req.query.page || 1;

//         const data =await Post.aggregate([{
//             $sort: {createdAt : -1}
//         }])
//         .skip(perPage * page - perPage)
//         .limit(perPage)
//         .exec();

//         console.log(page);
//         const count = await Post.countDocuments();
//         const nextPage =( parseInt(page)+1);
//         const hasNextPage = nextPage < Math.ceil(count / perPage)
//         console.log(hasNextPage)

//         res.render('index', {locals,
//              data,
//             current : page,
//         nextPage: hasNextPage ? nextPage : null 
//     });

 
//     }catch(error){
//         console.log(error);
//     }

// })



// router.get('',async (req,res) =>{
//     const locals = {
//         "title": "nodeJS Blog",
//         "description": "Using Nodejs, Express , MongoDB"
//     }
 
//     try{
//         const data =await Post.find();
//         res.render('index', {locals, data});


//     }catch(error){
//         console.log(error);
//     }

// })

// function insertData(){
//     Post.insertMany([
//         {
//             title: 'Building a blog',
//             body: "this is the body text"
//         },
//         {
//             title: 'Building a blog-2',
//             body: "this is the body text"
//         },  
//         {
//             title: 'Building a blog-3',
//             body: "this is the body text" 
//         },
//         {
//             title: 'Building a blog-4',
//             body: "this is the body text"
//         },
//     ])
// }
// insertData();


//GET 
// post:id

router.get('', async (req, res) => {
    try {
      const locals = {
        title: "nodeJS Blog",
        description: "Using Nodejs, Express, MongoDB"
      };
  
      // Validate page number
      let page = Math.max(1, parseInt(req.query.page)) || 1;
      const perPage = 5;
  
      // Fetch paginated posts
      const data = await Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);
  
      // Calculate total pages and next page
      const count = await Post.countDocuments();
      const totalPages = Math.ceil(count / perPage);
      const hasNextPage = page < totalPages;
  
      res.render('index', {
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? page + 1 : null
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });


router.get('/post/:id',async (req,res) =>{
     
        try{
            const locals = {
                "title": "nodeJS Blog",
                "description": "Using Nodejs, Express , MongoDB"
            }
           
            let slug = req.params.id

            const data = await Post.findById({_id: slug})
            res.render('post',{locals, data})
        }catch(error){
            console.log(error);
        }
    
    })

router.get('/about', (req,res) =>{
    res.render('about');
})

module.exports = router;
