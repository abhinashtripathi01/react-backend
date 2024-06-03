const userModel = require('../models/userModels')
const bcrypt = require ('bcrypt')
const JWT = require('jsonwebtoken')
const User = require('../models/userModels')
// Make a functon (Logic)

// 1. creating user function

const createUser = async(req,res) => {
    // res.send("Create API is working")
    // 1. Get data from the user (Fname, lname, email,pp)
    console.log(req.body)

    

    // #. Destructuring
    const {firstName, lastName,email,password} =req.body;
    // 2. validation
    if(!firstName || !lastName || !email || !password){
        return res.json({
            "success": false,
            "message" : "please enter all fields!"
        })
    }
    // error handling= Try and Catch
    try {
    // 2.1 if not : send the reponse and stop the process
    // 3. if proper data 
    // 4. check existing User
    const existingUser = await userModel.findOne({email : email})
    if(existingUser){
        res.json({
            "success" : false,
            "message": "User Already Exists!"
        })
    }

    //Hashing / Encrypt the Password
    const randomSalt = await bcrypt.genSalt(10)
    const hashPassword  = await bcrypt.hash(password,randomSalt)


    // 4.1 if yes : Send the response and stop the process
    //  if not:
    // 5. Save in the database
    const newUser = new userModel({
        //fields : Values received form user
        firstName : firstName,
        lastName : lastName,
        email: email,
        password : hashPassword
    })

    //Actually save the user in database
    await newUser.save()
    // 6. send the succes response
    res.json({
        "success" : true,
        "message": "User Created successfully"
    })
    

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message" : "internal server error!"
        })
    }
    
}


// 2.Login user function
const loginUser = async (req,res) => {
    //check incoming data : done
    console.log(req.body)

    //destructuring
    const {email,password} = req.body;


    //validation

    if(!email || !password){
        return res.json({
            "success": false,
            "message" : "please enter all fields!"
        })
    }

    try {

    //1 . Find user, if not : stop the process

    const user = await userModel.findOne({email : email})
    if(!user) {
        return res.json ({
            "success " : false,
            "message" : "User Not Found!"
        })
    }
    //2. Compare the password , if not : stop the process

    const isValidPassowrd = await  bcrypt.compare(password,user.password)
    if(!isValidPassowrd) {
        return res.json ({
            "success " : false,
            "message" : "Incorrect Password!"
        })

    }
    //3. Generate JWT token
    // 3.1 Secret Decryption key => (.env)
    const token = await JWT.sign(
        {id : user._id},
        process.env.JWT_SECRET
    )

    // send the token, userData, Message to the user
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

//exporting 
// module.exports = createUser  // only for create user

module.exports = {
    createUser,
    loginUser
}