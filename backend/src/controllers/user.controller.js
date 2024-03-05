import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import{uploadOnCloundinary} from  "../utils/cloudinary.js"
import { ApiResponce } from "../utils/ApiResponse.js";

const registerUser =  asyncHandler(async (req, res) => {
    //get user details from frontend
    // vaildation - not empty
    // check if user already exists in the database: email username
    //check for images ,check for avatar
    //upload them to cloudinary and get the url of image
    //create user object in the database - create entry in the database
    //remove password and refresh token filed from response
    //check for user creation
    //return res

  const {fullname,email,username,password} = req.body
 // console.log("email :",email);

//   if(fullname ===""){
//     throw new ApiError("fullname is required",400)
//   }

if(
    [fullname,email,username,password].some(field => field?.trim() === "")
){
    throw new ApiError("All fields are required",400)
}
const existedUser =  await User.findOne({
    $or:[{email},{username}]
})
if(existedUser){
    throw new ApiError("Email or username already exists",409)
}


const avatarLocalPath =req.files?.avatar[0]?.path;
//const coverImageLocalPath = req.files?.coverImage[0]?.path;

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}

if(!avatarLocalPath){
    throw new ApiError("Avatar is required",400)
}
const avatar= await uploadOnCloundinary(avatarLocalPath)
const coverImage = await uploadOnCloundinary(coverImageLocalPath)

if (!avatar) {
    throw new ApiError(400, "Avatar file is required")
}
// if(!coverImage){
//     throw new ApiError("Error in uploading coverImage",500)
// }

const user = await User.create({
    fullname,
    avatar : avatar.url,
    coverImage : coverImage?.url ||"",
    email,
    password,
    username :username.toLowerCase

})
const createdUser = await User.findById(user._id).select("-password -refreshToken")

 if(!createdUser){
    throw new ApiError("Error in creating user",500)
}

return res.status(201).json(
    new ApiResponce(201,createdUser,"User created successfully")
)




})

export {
    registerUser,
}