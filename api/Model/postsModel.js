const mongoose = require('mongoose');
const PostsSchema = new mongoose.Schema({
title:{
    type: String,
    require:true
},
summery:{
    type: String,
},
contact:{
    type:String
},
image:{
    type:String
}
})
module.exports= mongoose.model ('posts',PostsSchema);
