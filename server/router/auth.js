const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

router.get('/signup', (req, res) => {
    res.send("In Signup");
})

router.post('/register', async(req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword)
        return res.status(422).json({ error: "not filled all the feilds" });
    
    
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist)
            return res.status(422).json({ error: "email already exists" });
        else if (password != cpassword)
            return res.status(422).json({ error: "password and confirm passsword does not match" });
        else {
             const user = new User({ name, email, phone, password, cpassword });
        await user.save();
        res.status(201).json("user registered successfully");
        }
        
       

        
    }
    catch(err) {
        console.log(err);
   }
})

router.post('/signin', async (req, res) => {
    console.log('ww');
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(422).json({ error: "not filled all the feilds" });
    
    try {
        let token;
        const userLogin = await User.findOne({ email: email });
     

        if (userLogin)
        {
           //  console.log(userLogin);
            // console.log(userLogin.password);
            const isMatch = await bcrypt.compare(password, userLogin.password)

           
           
            if (isMatch)
            {
                 token = await userLogin.generateAuthToken();
                 res.cookie("Jwt_Token", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
                });
                console.log(token);
                return res.json("User logged in Successfully");
            }
            else {
                return res.status(400).json("wrong password");
            }
        }
        else
        {

            return res.status(400).json("No user found" );
        }
        
    }
    catch (err) {
        console.log(err);
        
    }
})
router.get('/about', authenticate, (req, res) => {
    console.log('from auth');
    res.send(req.rootUser);
    
})



module.exports = router;