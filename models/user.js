const { error } = require('console');
const { createHmac,randomBytes } = require('crypto');
const { default: mongoose } = require('mongoose');
const moongoose  = require('mongoose');
const { createTokanForUser } = require('../services/authentication');

const userSchema =  new moongoose.Schema ({

    fullname:{
        type :String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        uniqe:true
    },
    salt:{
        type:String,
        

    },
    password:{
        type:String,
        required:true
     
    },
    profileImageURL:{
        type:String,
        default: "/images/default.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",

    }
}
);


userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified("password"))
    return;

    const salt = randomBytes(16).toString();
    const hashpassowrd = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashpassowrd;

    next();
});


userSchema.static('matchpasswordAndGenrateTokan', async function(email,password){

    
     const user =  await this.findOne({email});

    if(!user)  throw new Error('User not Found');
   

    const salt = user.salt
    const hashpassowrd = user.password;

    const userprovidehash =createHmac("sha256",salt).update(password).digest("hex");


    if(hashpassowrd != userprovidehash)
    throw new Error('incorrect password');

    const token = createTokanForUser(user);
    return token;
});


const User = new mongoose.model("User",userSchema)

module.exports = User;


