const jwt = require('jsonwebtoken');

const secret = "$uperman@123";

function createTokanForUser(user){
    const payload ={
        _id : user._id,
        fullname:user.fullname,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,

    };

    const token = jwt.sign(payload,secret);
    return token;
}

   function validatetokan(token){

    const payload = jwt.verify(token,secret);
    return payload;
   }


   module.exports ={
    createTokanForUser,
    validatetokan,

   };