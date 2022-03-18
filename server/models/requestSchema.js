const mongoose = require('mongoose');
var reqSchema = new mongoose.Schema(
    {
        requestedObj_id: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'ADDPOST',
        },
        exchangeObj_id: {
            type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'ADDPOST'
            
        },
        requestedObjOwner_id: {
            type:  mongoose.Schema.Types.ObjectId,
            required:true,
            
        },
        exchangeObjOwner_id: {
            type:  mongoose.Schema.Types.ObjectId,
            required:true,
            
        },
        status: {
            type: String,
            enum: ['ACCEPTED', 'REJECTED', 'PENDING'],
            default: 'PENDING'
        }
 }
)
 
const reqObj = mongoose.model('REQUEST_ITEM',reqSchema );
module.exports = reqObj;
