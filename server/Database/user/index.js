import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        phoneNumber: [
            {
                type: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

UserSchema.methods.generateJwtToken = async function() {
    return jwt.sign({user: this._id.toString()}, "ElectricwaalaApp");
}

UserSchema.statics.findEmailAndPhone = async ({ email, phoneNumber }) => {
    //check whether the email exists
    const checkUserByEmail = await UserModel.findOne({email});
  
    //check whether the phoneNumber Exists
    const checkUserByPhone = await UserModel.findOne({phoneNumber});
    if(checkUserByEmail || checkUserByPhone) {
      throw new Error("User already exist");
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    //check whether the email exists
    const user = await UserModel.findOne({email});
    if(!user) {
        throw new Error("User doesn't exist");
    }
  
    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if(!doesPasswordMatch) {
      throw new Error("Invalid Password");
    }
    return user;
};

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")) return next();

    bcrypt.genSalt(8,(error,salt) => {
        if(error) return next(error);

        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);

            //assigning hash
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);