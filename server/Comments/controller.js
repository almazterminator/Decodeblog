const  Comment  = require('./Comments');

const saveComm = async(req, res) => {
    if(req.body.authorId && req.body.postId ){
        await new Comment({
            text: req.body.text,
            postId: req.body.postId,
            authorId: req.body.authorId,
            date: Date.now()
        }).save()
    }
    res.status(200).send(true);
};

module.exports = {
    saveComm
};