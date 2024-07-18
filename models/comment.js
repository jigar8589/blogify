const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema ({

    content:{
        type:String,
        required:true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog",

    },
    CreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

},{timestamps:true});

const comment = mongoose.model("comment",commentsSchema);

module.exports = comment;

