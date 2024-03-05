import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true
    },
    coverImage: {
        type: String
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    refreshToken: {
        type: String
    }
},

{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrecet = async function (password) {
    return await bcrypt.compare(password, this.password);
}
 userSchema.methods.generateAccessToken = function(){
 return jwt.sign(
    {
        _id: this._id,
        username: this.username,
        email: this.email,
        fullname: this.fullname,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:  process.env.ACCESS_TOKEN_EXPIRES
    }
)

 }
 userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
    
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:  process.env.REFRESH_TOKEN_SECRET
        }
    )

 }
export default mongoose.model("User", userSchema);
