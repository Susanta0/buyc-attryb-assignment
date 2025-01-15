// const jwt =require("jsonwebtoken")
// const privateKey=process.env.privateKey

// const userValidation=(req, res, next)=>{
//     const header= req.headers["authorization"]
//     const token = header?.split(" ")[1]
//     const {email, password}=req.body

//     if(!token || !email || !password){
//         return res.status(400).json({message:"token is not provided & required field missing"})
//     }else{
//         jwt.verify(token, privateKey , (err, decoded) =>{
//             req.body.userId = decoded.userId,
//             next()
//             console.log(decoded)
//         });
//     }
// }

// module.exports=userValidation


const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


const userValidation = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from 'Authorization' header

  if (!token) {
    return res.status(400).json({ message: 'token is not provided & required field missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.privateKey);  // Verify token
    req.user = await userModel.findById(decoded.userId); 

    next();  // Proceed to the next middleware or route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = userValidation;
