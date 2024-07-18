const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema ({

    title:{
        type:String,
        required:true

    },
    body:{
        type:String,
        required:true
    },
    CoverImageURL:{
        type:String,
    },
    CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    
    
    

},{timestamps:true});


const Blog = mongoose.model("blog",blogSchema);

module.exports = Blog;