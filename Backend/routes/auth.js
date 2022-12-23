// Importing pakages
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRETE = 'Amanisagoodboy'

//Route 1 - Create a user using : POST "/api/auth/createuser"
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
] ,async (req,res)=>{

    // If there are errors return Bad request and the Answer
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try
    {
        // Checking User already exists or Not
    let user = await User.findOne({email: req.body.email});
    let success = true
    if(user){
        success = false;
        return res.status(400).json({success, error: "Sorry a user with this email already exist"})
    }
    
    const salt = await bcrypt.genSalt(10); // Creating a salt
    secPass = await bcrypt.hash(req.body.password, salt) // creating password Hash with salt
    
    // Adding User
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
      
    const data = {
        user:{
        id:user.id
       }
    }
    const authtoken = jwt.sign(data, JWT_SECRETE);
    // console.log(jwtData)
    
    // res.json(user)
    res.json({success,authtoken})

    } catch(error){
        // Showing Error In case the User Entry Fails...
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

//Route 2 - Authenticate a USER using  : POST "/api/auth"

router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
] ,async (req,res)=>{

    // 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ errors: "Please try with correct login" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            let success = false;
            return res.status(400).json({success, errors: "Please try with correct login" });
        }
        
        const data = {
            user:{
            id:user.id
           }
        }

        const authtoken = jwt.sign(data, JWT_SECRETE);
        let success = true;
        res.json({success,authtoken})



    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
})

// Route 3: et loggedin User Details using POST "/api/auth/getuser". Login Requires

router.post('/getUser' ,fetchuser, async (req,res)=>{

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }

})

module.exports = router