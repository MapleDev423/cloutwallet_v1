const mongoose = require('mongoose');

const UserTransactionSchema = mongoose.Schema({
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
    BitCloutToSellNanos:{
        type:Number,
        required:true
    },
    CreatorCoinToSellNanos:{
        type:Number,
        required:true
    },
    /**
     * 0:buy
     * 1:sell
     */
    transactorpublickey:{
        type:String,
        required:true
    },
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
})
module.exports = mongoose.model('usertransaction', UserTransactionSchema);
