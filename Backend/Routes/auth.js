"use strict"
const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWTSecret = "pavas$@#()bhjrere234";

//checking validations using express-validator package.
//Route1
router.post("/createuser", [

    body('name', "Enter valid name").isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Password must be at least 5 characters long").isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    // use try catch to find if any internal server error occurs
    try {
        // creating the user
        let user = await User.findOne({ email: req.body.email });
        //if user is not unique return the error as res
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }
        // for generating salt from bcryptjs
        const salt = await bcryptjs.genSalt(10);
        // for hashing the password in body req and adding salt
        const securedPassword = await bcryptjs.hash(req.body.password,salt);
        user = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
            }
        )
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWTSecret);
        res.json({authtoken:authtoken});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

//  Authenticate a user using : POST "/api/auth/login"
//Route2
router.post("/login",[
    body("email","Enter a valid Email").isEmail(),
    body("password","Password cannot be blank").exists(),

],async (req,res)=>{

    // if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const{email,password} = req.body;
    try{
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcryptjs.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,JWTSecret);
        res.json({authtoken:authtoken});

    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }


});

//Route3
// get loged in user details using: POST "api/auth/getuser" Login Required
router.post("/getuser",fetchuser,async (req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); 
        // to select all fields in docs except password
        res.send(user)
    }catch(err){
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;



