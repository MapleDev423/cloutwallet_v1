const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    userpublickey:{
        type:String,
        required:true
    },
    totaltransaction:{
        type:Number,
        required:true
    },
    /**
     * timestamp
     */
    lastsync:{
        type:Number,
        required:true
    },
    /**
     * 0:no
     * 1:yes
     */
    fullysynced:{
        type:Number,
        required:true
    },
    lastBlockHeight:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model('user', UserSchema);
