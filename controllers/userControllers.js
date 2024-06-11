const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// 1. Creating user function
const createUser = async (req,res) => {
    // 1. Get data from the user (Fname, lname, email, pp)
    console.log(req.body)
    
    // #. Destructuring
    const {firstName, lastName, email, password} = req.body;

    // 2. Validation
    if(!firstName || !lastName || !email || !password){
        return res.json({
            "success": false,
            "message" : "Please enter all fields!"
        })
    }

    // Try - Catch (Error Handling)
    try {
        // check if the user is already exist
        const existingUser = await userModel.findOne({email : email})
        if(existingUser){
            return res.json({
                "success" : false,
                "message": "User Already Exists!"
            })
        }

        // Hash/encrypt the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,randomSalt)


        // Save the user in database
        const newUser = new userModel({
            // Fields : Values received form user
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword
        })

        //  Actually save the user in database
        await newUser.save()

        // send the success response
        res.json({
            "success" : true,
            "message" : "User Created Successfully!"
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
        
    }
}


// 2. Login user function
const loginUser = async (req,res) => {
    // check incomming data : pass
    console.log(req.body)

    // destructuring
    const {email, password} = req.body;

    // validation
    if(!email || !password){
        return res.json({
            "success" : false,
            "message" : "Please enter all fields!"
        })
    }

    try {
        // 1. Find user, if not : stop the process
        const user = await userModel.findOne({email : email})
        if(!user) {
            return res.json({
                "success" : false,
                "message" : "User Not Found!"
            })
        }

        // 2. Compare the password, if not : stop the process
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.json({
                "success" : false,
                "message" : "Incorrect Password!"
            })
        }

        // 3. Generate JWT token
        // 3.1 Secret Decryption Key (.env)
        const token = await jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET
        )

        // 4. Send the token, userData, Message to the user
        res.json({
            "success" : true,
            "message" : "Login Successful!",
            "token" : token,
            "userData" : user
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
    }


}

// exporting
module.exports = {
    createUser,
    loginUser
}