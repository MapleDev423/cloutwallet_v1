const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require("axios");
const Transaction = require('../db/Transaction');
const TransactionSync = require('../db/TransactionSync');
const User = require('../db/User')

router.get('/user_check',async(req,res,next)=>{

    // const userpublickey = req.body.userpublickey;
    // const username = req.body.username;
    // BC1YLhTnbjVDSQ6MHRQWRWnygArXUfsG8rXLXmMaSirzRxcFPyrLqo8
    // cloutwallet
    // BC1YLhh2vtqR5E1YZKp9NTq4addJ8Y4FCdeiUDJUZ3V6BvjztQXoSmS
    // amrk
    // BC1YLguXUzCjZ222stiHmSF7NiBdkNKRqSqJVs6ADrmNQgjg3w9UHqu
    // bitcloutQ
    // BC1YLhCzm8H6DJLpWGXfApjZiorurW7mVMNUdsZpNF3GiLZHvDf7uo9
    // BC1YLj4RY8H6YXPWaDcw5PVwJYTrSgbXtTpA8hYaTggQBZxwYB2mPEJ
    // hyped
    let userpublickey = req.query.userpublickey;
    let username = req.query.username;
    //console.log(userpublickey)
    //console.log(username)
    
    let existUsers = await User.find({
        username:username,
        userpublickey:userpublickey
    })
    
    if(existUsers.length == 0){
        let config = {
            method: "post",
            url: `https://api.bitclout.com/api/v1/transaction-info`,
            headers: { "Content-Type": "application/json" },
            data: {
                PublicKeyBase58Check: userpublickey,
            }
        };
        try{
            let transactioninfo = await axios(config);
            let creatorcoins = transactioninfo.data.Transactions.filter((item)=>{
                return item.TransactionType == 'CREATOR_COIN' && item.TransactionMetadata.AffectedPublicKeys[1].PublicKeyBase58Check == userpublickey
            })
            console.log('creator_coin:',creatorcoins.length)
            /** */
            let historyInfo = []
            let prvlocked = 0;
            let prvcirculation = 0;
            let tempIndx = 0;
            
            let hresult = []

            creatorcoins.map((item)=>{
                let locked = 0;
                let circulation = 0;
                let transactiontype = 0;
                if(item.TransactionMetadata.CreatorCoinTxindexMetadata.OperationType == 'buy'){
                    let templock = item.TransactionMetadata.CreatorCoinTxindexMetadata.BitCloutToSellNanos / 1000000000 * 0.9999;
                    templock = Math.floor(templock * 1000000000) / 1000000000;
                    locked = prvlocked + templock;
                    circulation = Math.pow(locked,0.33333333333333333) * 10;
                    transactiontype = 0;
                }else
                {
                    let coins = Math.ceil(item.TransactionMetadata.CreatorCoinTxindexMetadata.CreatorCoinToSellNanos) / 1000000000;
                    circulation = prvcirculation - coins;
                    locked = Math.pow(circulation,3)/1000;
                    transactiontype = 1;

                }
                if(item.BlockHashHex && item.BlockHashHex != "0000000000000000000000000000000000000000000000000000000000000000"){
                    let newItem = {
                        locked:             locked,
                        circulation:        circulation,
                        coins:              circulation - prvcirculation,
                        blockhash:          item.BlockHashHex,
                        bitcloutcoins:      item.TransactionMetadata.CreatorCoinTxindexMetadata.BitCloutToSellNanos / 1000000000,
                        transactiontype:    transactiontype,
                        username:           username,
                        userpublickey:      userpublickey
                    }
                    historyInfo = [
                        ...historyInfo,
                        newItem
                    ]
                }
                
            
                prvlocked = locked;
                prvcirculation = circulation;
            })
            /** */
            /*
             res.status(200).json({
                 historyinfo:creatorcoins
             })
            
             return
             */
            let lastBlockHeight = 0;
            let onestepcnt = 30;
            let stepLen = Math.ceil( historyInfo.length / onestepcnt )
            let currentStep = 0;
            while(currentStep < stepLen){
                let currentStepFir = onestepcnt * currentStep;
                let currentStepLas = Math.min(historyInfo.length, onestepcnt * (currentStep + 1))

                //   setTimeout(() => {
                    for(let index = currentStepFir;index < currentStepLas;index++)
                    {
                        /*
                        console.log("-------------------------------------------------------------")
                        console.log('currentStepLas:',currentStepLas)
                        console.log('sIndex:',index)
                        console.log(historyInfo[index].blockhash)
                        */
                        var itemblockconfig = {
                            method: 'post',
                            url: 'https://api.bitclout.com/api/v1/block',
                            headers: { 
                                'Content-Type': 'application/json'
                            },
                            data : JSON.stringify({"HashHex": historyInfo[index].blockhash})
                        };
                        
                        //console.log(historyInfo[index].locked)
                        

                        const r = await axios(itemblockconfig);
                        

                        let d = new Date(r.data.Header.TstampSecs * 1000)
                        historyInfo[index].index = index;
                        historyInfo[index].timestamp = r.data.Header.TstampSecs;
                        historyInfo[index].time = d.toDateString();
                        historyInfo[index].blockHeight = r.data.Header.Height;
                        if(lastBlockHeight < r.data.Header.Height)
                        {
                            lastBlockHeight = r.data.Header.Height;
                        }
                            hresult = [
                            {
                                sindex:index,
                                locked:historyInfo[index].locked,
                                time:r.data.Header.TstampSecs,
                                currentstep:currentStep
                            },
                            ...hresult
                        ]
                        //console.log(r.data.Header.TstampSecs)
                    }
                    currentStep += 1;
                    //console.log('CurrentStep:',currentStep)
                    await new Promise(resolve => setTimeout(resolve, 15000))
                //   }, 3000);
            }
    
            const deleteTransactionResult = await Transaction.deleteMany({username:username});
            const insertTransactionResult = await Transaction.insertMany(historyInfo);
            const deleteUserResult = await User.deleteOne({username:username});
            const insertUserResult = await User.create({
                username:           username,
                userpublickey:      userpublickey,
                totaltransaction:   historyInfo.length,
                lastsync:           Date.now(),
                fullysynced:        1,
                lastBlockHeight:    lastBlockHeight
            });
            
            res.status(200).json({
                info:hresult,
                historyinfo:historyInfo
            })
        }catch(transactionErr){
        //    console.log('transaction error')
            console.log(transactionErr)
        }
    }
  
})
router.get("/get_user",async(req,res,next)=>{
    try{
        let userpublickey = req.query.userpublickey;
        let username = req.query.username;
        let existUsers = await User.find({username:username})
        if(existUsers.length != 0){
            let user = existUsers[0];
            let transactionHistory = await Transaction.find({username:user.username})
            
            res.status(200).json({
                status:'success',
                result:{
                    history:transactionHistory,
                    user:user
                }
            })
        }else
        {
            res.json(201).json({
                status:'error',
                result:'not logged in yet'
            })    
        }
    }catch(e){
        // res.json(201).json({
        //     status:'error',
        //     result:e
        // })
    }
})
router.get("/db",async(req,res,next)=>{
    try{
        let userpublickey = req.query.userpublickey;
        let dbtransationlogs = await Transaction.find({
            userpublickey:userpublickey
        })
        let transactionsync = await TransactionSync.findOne({
            userpublickey:userpublickey
        })
        res.status(200).json({
            status:'success',
            result:{
                logs:dbtransationlogs,
                sync:transactionsync
            },
        })
    }
    catch(e){
        res.json(201).json({
            status:'error',
            result:e
        })
    }
})
router.get("/latest",async(req,res,next)=>{
    try{
//      let userpublickey = "BC1YLhh2vtqR5E1YZKp9NTq4addJ8Y4FCdeiUDJUZ3V6BvjztQXoSmS";
        let userpublickey = req.query.userpublickey;
        let username='iaan'
        
        let dbtransationlogs = await Transaction.find({
          //  username:username,
            userpublickey:userpublickey
        })

        let config = {
            method: "post",
            url: `https://api.bitclout.com/api/v1/transaction-info`,
            headers: { "Content-Type": "application/json" },
            data: {
                PublicKeyBase58Check: userpublickey,
            },
        };
        axios(config)
        .then(async response=>{
            let apiCreatorCoinArray = response.data.Transactions.filter((item)=>{
                return item.TransactionType == 'CREATOR_COIN' && item.TransactionMetadata.AffectedPublicKeys[1].PublicKeyBase58Check == userpublickey
            })
            let historyInfo = []
            let prvlocked = 0;
            let prvcirculation = 0;
            let tempIndx = 0;
            console.log('1')
            apiCreatorCoinArray.map((item)=>{
                let locked = 0;
                let circulation = 0;
                let transactiontype = 0;
                if(item.TransactionMetadata.CreatorCoinTxindexMetadata.OperationType == 'buy'){
                    locked = prvlocked + item.TransactionMetadata.CreatorCoinTxindexMetadata.BitCloutToSellNanos / 1000000000 * 0.9999;
                    circulation = Math.pow(locked,0.33333333333333333) * 10;
                    transactiontype = 0;
                }else
                {
                    let coins = item.TransactionMetadata.CreatorCoinTxindexMetadata.CreatorCoinToSellNanos / 1000000000;
                    circulation = prvcirculation - coins;
                    locked = Math.pow(circulation,3)/1000;
                    transactiontype = 1;

                }
                
                let newItem = {
                    locked:             locked,
                    circulation:        circulation,
                    coins:              circulation - prvcirculation,
                    blockhash:          item.BlockHashHex,
                    bitcloutcoins:      item.TransactionMetadata.CreatorCoinTxindexMetadata.BitCloutToSellNanos / 100000000,
                    transactiontype:    transactiontype
                }
                historyInfo = [
                    newItem,
                    ...historyInfo
                ]
            
                prvlocked = locked;
                prvcirculation = circulation;
                //tempIndx++;
            })
            console.log('success')
            if(dbtransationlogs.length == historyInfo.length){

            }else {
                let newAddArray = []
                await Promise.all(historyInfo.map(async(item)=>{
                    let existIndex = dbtransationlogs.findIndex((dbItem)=>{
                        return dbItem.locked == item.locked
                    })
                    if(existIndex >= 0){

                    }else{
                        var itemblockconfig = {
                            method: 'post',
                            url: 'https://api.bitclout.com/api/v1/block',
                            headers: { 
                                'Content-Type': 'application/json'
                            },
                            data : JSON.stringify({"HashHex":item.blockhash})
                        };
                        const r = await axios(itemblockconfig)
                        let d = new Date(r.data.Header.TstampSecs * 1000)
        
                        item.timestamp = r.data.Header.TstampSecs;
                        item.time = d.toDateString()
                        let newItem = {
                            username:       username,
                            userpublickey:  userpublickey,
                            bitcloutcoins:  item.bitcloutcoins,
                            locked:         item.locked,
                            circulation:    item.circulation,
                            coins:          item.coins,
                            transactiontype:item.transactiontype,
                            timestamp:      item.timestamp,
                            time:           item.time    
                        }
                        newAddArray = [
                            ...newAddArray,
                            newItem
                        ]
                    }
                }))
                let re = await Transaction.insertMany(newAddArray)
                dbtransationlogs = [
                    ...dbtransationlogs,
                    ...newAddArray
                ]
            }

            let transactionsynclog = await TransactionSync.findOne({userpublickey:userpublickey})

            if(transactionsynclog){
                await TransactionSync.updateOne(
                    {userpublickey:transactionsynclog.userpublickey},
                    {synctime:Date.now()})
            }else{
                await TransactionSync.create({
                    userpublickey:userpublickey,
                    synctime:Date.now()
                })
            }

            let sortedlogs = dbtransationlogs.sort((a,b)=>{
                return a.timestamp - b.timestamp > 0 ? 1 : -1;
            })

            res.status(200).json({
                status:'success',
                result:sortedlogs
            })

            
        }).catch(err=>{
            res.status(201).json({
                status:'api_error',
                result:err
            })
            
        })
    }
    catch(e){
        res.status(201).json({
            status:'error',
            result:e
        })   
    }
})
module.exports = router;


/*
var db = firebase.firestore();
var batch = db.batch()

save(docs: any[]) {
  docs.forEach((doc) => {
    var docRef = db.collection("col").doc(); //automatically generate unique id
    batch.set(docRef, doc);
  });
  return batch.commit();
}
*/