const mongoose = require('mongoose');

const TransactionSyncSchema = mongoose.Schema({
    userpublickey:{
        type:String,
        required:true
    },
    synctime:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('transactionsync', TransactionSyncSchema);
