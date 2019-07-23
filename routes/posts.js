const router = require('express').Router();
const auth = require('./verifyToken');
const Post = require('../models/Post');

router.post('/', auth , async (req,res) => {
    const result = await Post.findOne({uid:req.body.uid});
    res.send(result);
});

router.post('/postData', auth ,async (req,res) => {
    const post = {
        title:req.body.title,
        description:req.body.desc
    };
    const response = await Post.updateOne({uid:req.body.uid},{$push:{posts:post}});
    res.status(200).send(response);
})

module.exports = router;