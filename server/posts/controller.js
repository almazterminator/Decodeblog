const Post = require('./posts')
const fs = require('fs')
const path = require('path')
const posts = require('./posts')

const createPost = async(req,res)=>{
    if(req.file && req.body.title.length >2 && req.body.description.length > 5 && req.body.category.length >2){
        await new Post ({
            title: req.body.title,
            category: req.body.category,
            image: `/img/posts/${req.file.filename}`,
            description: req.body.description,
            author: req.user._id
        }).save()
        res.redirect(`/blog-log/${req.user._id}`)
    }else{
        res.redirect('/new-blog?error=1')
    }
}

const editPost = async (req, res) => {
    if (req.file && req.body.title.length > 0 &&
        req.body.description.length > 5 &&
        req.body.category.length > 1  
    ) { 
            const post = await Post.findById(req.body.id);
            post.title = req.body.title;
            post.description = req.body.description;
            post.category = req.body.category;
            post.image = `/img/posts/${req.file.filename}`;
            post.author = req.user._id;

            await post.save();
            res.redirect(`/blog-log/${req.user._id}`);
    } else {
        res.redirect(`/edit/${req.body.id}?error=1`);
    }
};

const deletePost = async(req,res)=>{
    const post = await Post.findById(req.params.id)
    if(posts){
        fs.unlinkSync(path.join(__dirname + '../../../public' + post.image))
        await Post.deleteOne({_id:req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Failed to connection')
    }
}

module.exports = {
    createPost,
    editPost,
    deletePost
}