import mongoose, { Schema } from "mongoose";

const urlScehma=new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timeStamp:{type: Number}}],
},
{timestamps:true},
);

const URL=mongoose.model('url',urlScehma);

export {URL};