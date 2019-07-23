const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation , loginValidation} = require('../validation');
const jwt = require('jsonwebtoken'); 

router.post('/register',async (req,res) => {
    const {error} = registerValidation(req.body)

    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    const {name,email,password} = req.body;

    const emailExist = await User.findOne({email:email});

    if(emailExist) return res.status(400).send("Email already Exists!!!");
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt); 

    const newUser = new User({
        name,
        email,
        password:hash
    });
    try{
        const savedUser = await newUser.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(500).send(err);
    }
      
});

router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const {error} = loginValidation(req.body);
    
    if(error) return res.status(200).send(error.details[0].message);

    const user = await User.findOne({email:email});

    if(!user) return res.status(200).send("Email does not exists!!!");

    const result = await bcrypt.compare(password, user.password);
    if(!result) return res.send('Password does not match!!');
    
    const token = jwt.sign({uid:user._id},process.env.secret);

    // res.header('auth-token',token).send('Logged In!');
    res.send({token:token,uid:user._id});
});

module.exports = router;