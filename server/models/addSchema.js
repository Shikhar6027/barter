const mongoose = require('mongoose');
var addSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
        },
        owner: {
             type: String,
      required: true,
        
        },
        owner_id: {
             type: String,
      required: true,
        },
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required:true
    }
  },
  {
    timestamps: true,
  }
)
 
const Add = mongoose.model('ADDPOST', addSchema);
module.exports = Add;
