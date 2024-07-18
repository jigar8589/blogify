const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Bogify",{

}).then(()=>{
    console.log("connection is success");
}).catch((e) =>{
    console.log(e);

})