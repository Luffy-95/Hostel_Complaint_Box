const UserModel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req,res) => {
    try{
        const { name, email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409).json({message: "User already exist,you can login",success: false});
        }

        const createUser = new UserModel({name, email, password});
        createUser.password = await bcrypt.hash(password, 10);
        await createUser.save();

        res.status(201).json({
            message : "SignUp Successful",
            success : true
        })

    }catch(err){
        res.status(500).json({
            message : "Internet server error",
            success : true
        })
    }
}

const login = async (req,res) => {
    try{
        const { email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(409).json({message: "Authorisation failed email is wrogn", success: false});
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if(!isPassEqual){
            return res.status(403).json({
                message: "Auth failed password is wrong",
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {email : user.email,_id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "72h"}
        )
    
        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
            isAdmin: user.isAdmin
        })
    }catch(err){
        res.status(500).json({
            message : "Internet server error",
            success : true
        })
    }
}

module.exports = {signup,login}