const express = require('express')
const router = express.Router();
const Category = require('../category/category')
const User = require('../auth/User')
const Post = require('../posts/posts')
const Comment = require('../Comments/Comments')

router.get('/', (req,res)=>{
        res.render('reg' , {user:req.user ? req.user : {}})
})


router.get('/log' ,(req,res)=>{
    res.render('log', {user:req.user ? req.user : {}})
})
router.get('/new-blog' , async (req,res)=>{
    const AllCategory = await Category.find()
    res.render('new-blog', {categories: AllCategory, user: req.user ? req.user:{}})
})

router.get('/detail/:id' ,async (req,res)=>{
    const comment = await Comment.find({postId: req.params.id}).populate('authorId')
    const AllCategory = await Category.find()
    const posts = await Post.findById(req.params.id).populate('category').populate('author')
    res.render('detail' ,{user:req.user ? req.user : {} ,comments: comment , posts:posts ,categories: AllCategory })
})

router.get('/news-log' , async(req,res)=>{
    const options = {}
    const category = await Category.findOne({ key: req.query.categ });
             if (category) {
                    options.category = category._id;
                    res.locals.category = req.query.categ;
            }
        if (req.query.search && req.query.search.length > 0) {
                    options.$or = [
                        { title: new RegExp(req.query.search, 'i') }
                    ];
                    res.locals.search = req.query.search;

        }
    let page = 0
    const limit = 3
    
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }
    const comment = await Comment.find({postId: req.params.id}).populate('authorId')
    const totalPosts = await Post.countDocuments(options)
    const AllCategory = await Category.find()
    const posts = await Post.find(options).limit(limit).skip(page * limit).populate('category').populate('author')
    res.render('news-log', {categories: AllCategory , comment, user:req.user ? req.user : {},posts,pages : Math.ceil(totalPosts / limit)})
})

router.get('/blog-reg' ,async(req,res)=>{
    const AllCategory = await Category.find()
    const posts = await Post.find() 
    res.render('blog-reg',{categories: AllCategory, user:req.user ? req.user : {} , posts})
})
router.get('/blog-log/:id' ,async (req,res)=>{
   
        const userId = req.params.id; // Получаем userId из параметров URL
        const AllCategory = await Category.find();
        const user = await User.findById(userId); // Находим пользователя по ID
        const userPosts = await Post.find({ author: userId }).populate('category').populate('author'); 
        res.render('blog-log', { 
            currentUser: req.user ? req.user : {}, 
            allCategories: AllCategory,
            posts: userPosts, 
            user 
        });
})
router.get('/edit/:id' ,async (req,res)=>{
    const AllCategory = await Category.find()
    const posts = await Post.findById(req.params.id)
    res.render('edit' ,{categories: AllCategory,user:req.user ? req.user : {} , posts})
})


module.exports = router