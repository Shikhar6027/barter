const User = require('../models/userSchema');


const jwt = require('jsonwebtoken');
const authenticate = async (req, res, next) => {
    //console.log(req.cookies.Jwt_Token);
    try {
        const token = req.cookies.Jwt_Token;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token":token });
       // const rootUser = await User.findById(verifyToken._id);
        if (!rootUser)
        {
            throw new Error('User not found');
        }
        else
        {
            
            req.token = token;
            req.rootUser = rootUser;
            req.UserID = rootUser._id;
            next();
            }
        
    }
     catch (error) {
        res.status(401).send('Unauthorized:no token provided');
        console.log(error);
        
    }
}
module.exports = authenticate;