const { validatetokan } = require("../services/authentication");

function checkAuthenticationCookie(cookieName){
    return(req,res,next) =>{

        const tokenCookieVlaue = req.cookies[cookieName];

        if(!tokenCookieVlaue){
             return next();
        }

        try{
            const userpayload = validatetokan(tokenCookieVlaue);
            req.user = userpayload;
        }catch(error){}

    return next();
    };
}

module.exports ={
    checkAuthenticationCookie,
}