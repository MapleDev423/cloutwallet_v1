const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    userpublickey:{
        type:String,
        required:true
    },
    index:{
        type:Number,
        required:true
    },
    bitcloutcoins:{
        type:Number,
        required:true
    },
    locked:{
        type:Number,
        required:true
    },
    circulation:{
        type:Number,
        required:true
    },
    coins:{
        type:Number,
        required:true
    },
    /**
     * 0:buy
     * 1:sell
     */
    transactiontype:{
        type:Number,
        required:true
    },
    blockHeight:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('transaction', TransactionSchema);
