import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { genTokenSetCookie } from "../utils/genToken.js"

export const signUp = async (req, res) => {

    
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            res.status(400).json({ error: "passwords dont match" })
        }

        const user = await User.findOne({ userName })


        
        if (user) {
            res.status(400).json({ error: "userName already exist" })

        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl`

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        


        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            confirmPassword,
            gender,
            profilePic: gender == "male" ? boyProfilePic : girlProfilePic

        })
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (newUser) {
            genTokenSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })

        }
        else {
            res.status(400).json({ error: "invalid user data" })
        }


    } catch (error) {
        console.log("error in signUp controler", error.message)
        res.status(500).json({ "message": "internal server error" })

    }


}


// export const signUp = async (req, res) => {
//     console.log("hello")
//     try {
//         const { fullName, userName, password, confirmPassword, gender } = req.body
//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "passwords don't match" });
//         }

//         const user = await User.findOne({ userName });
//         if (user) {
//             return res.status(400).json({ error: "userName already exists" });
//         }

//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy`;
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl`;

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             fullName,
//             userName,
//             password: hashedPassword,
//             confirmPassword,
//             gender,
//             profilePic: gender === "male" ? boyProfilePic : girlProfilePic
//         });

//         // Set CORS headers
//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//         res.setHeader('Access-Control-Allow-Methods', 'POST');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//         // Save the new user to the database
//         genTokenSetCookie(newUser._id, res);
//         await newUser.save();

//         // Send the response
//         return res.status(201).json({
//             _id: newUser._id,
//             fullname: newUser.fullName,
//             userName: newUser.userName,
//             profilePic: newUser.profilePic
//         });

//     } catch (error) {
//         console.log("Error in signUp controller", error.message);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };







export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) {
            console.log("Invalid credentials");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If credentials are correct, generate token and set cookie
        genTokenSetCookie(user._id, res);

        // Return user data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.userName,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};







export const logOut = (req,res) => {
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        res.status(200).json({message:"logout successfully"})
        
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
