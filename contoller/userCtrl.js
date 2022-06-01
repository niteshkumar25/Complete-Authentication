const userModel = require('../models/usermodels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userCtrl = {
    register : async(req,res)=>{
       try {

        const {username, email, password} = req.body;
        const user = await userModel.findOne({email:email});
        if(user) return res.status(400).json({msg:"email already exists"});
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new userModel({
            username:username,
            email:email,
            password:hashpassword
        })
       await newUser.save();
        res.json({"msg": "You are registerd"})
       } catch (err) {
           return res.status(500).json({msg:err.message})
           
       }

    },
    login: async(req,res)=>{
        try {
            const {email,password} = req.body;
            const user = await userModel.findOne({email:email});
            if(!user) return res.status(400).json({msg:"user does exist"});
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return  res.status(400).json({msg:"Password and email invalid"});

            //if Login 
        const payload = {id:user._id, name:user.username}
        const token = await jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:'1d'})
        res.json({token})
            // res.json({"msg": "You are login"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
 
    },
    VerifiedToken: async(req,res)=>{
        try {
            const token= req.header("Authorization");
            if (!token) return res.send(false);
            jwt.verify(token,process.env.TOKEN_SECRET, async(err,verfied)=>{
                if(err) return res.send(false);
                const user = await userModel.findById(verfied.id);
                if(!user) res.send(false)
                res.send(true);
            })
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }

    }

}

module.exports = userCtrl;