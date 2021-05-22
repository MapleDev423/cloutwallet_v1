const cron = require("node-cron");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
const User = require('./db/User')

//const fetch = require("node-fetch");
const axios = require("axios");

const serviceAccount = require("./firebaseconfig.json");

const Transaction = require("./db/Transaction");
const UserTransaction = require("./db/UserTransaction");

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://kong-3418f-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

const nanosToBitClout = (nanos) => {
  return nanos / 1000000000;
};
function USDValueFrom(
  BitCloutPrice,
  creatorCoinCirculated,
  creatorCoinHeld
) {
  return range(
    getUSDLocked(creatorCoinCirculated, BitCloutPrice),
    coin_supply2coin_price(
      creatorCoinCirculated - creatorCoinHeld,
      BitCloutPrice
    ),
    BitCloutPrice
  );
}

// usd locked = 0.001 * supply**3
function getUSDLocked(creatorCoinCirculated, BitCloutPrice) {
  return 0.001 * creatorCoinCirculated ** 3 * BitCloutPrice;
}
// return currentCreatorCoinPrice in USD
function coin_supply2coin_price(creatorCoinCirculated, BitCloutPrice) {
  return BitCloutPrice * (0.003 * creatorCoinCirculated ** 2);
}

function range(usd_locked, input_value, BitCloutPrice) {
  let expected_supply =
    (10 * Math.sqrt(10 / 3) * Math.sqrt(input_value)) /
    Math.sqrt(BitCloutPrice);
  let expected_usd_locked = 0.001 * expected_supply ** 3 * BitCloutPrice;
  return usd_locked - expected_usd_locked;
}
/*
cron.schedule("0 * * * *", async function () {
  
  try{
    console.log('hourCron+++++++');
    const usersDb = db.collection("users");
    const userData = await usersDb.get();
    let cDate = Date.now();
    let userList = [];
    
    userData.docs.forEach((item) => {
      let newItem = {
        docId: item.id,
        ...item.data(),
      };
      userList = [newItem, ...userList];
    });

    console.log(userList.length)
    let BitClout_price;
    axios.all([
          axios.get("https://api.bitclout.com/get-exchange-rate"),
          axios.get("https://blockchain.info/ticker"),
        ])
    .then(async(responseArr) => {

          BitClout_price =
            ((responseArr[1].data.USD.last / 100) *
            responseArr[0].data.SatoshisPerBitCloutExchangeRate) /
            1000000;
          let breakpoint = 0;
          

          let addedData = [];
          for(let i = 0;i < userList.length;i+=1){

            let user = userList[i];
            breakpoint += 1;
            console.log('breakpoint:',breakpoint)
            if(breakpoint % 60 == 0){
              console.log('startWait')
              await new Promise(resolve => setTimeout(resolve, 15000))                      
              console.log('endwait')
            }
           
          
              let holdingConfig = {
                method: "post",
                url: `https://api.bitclout.com/get-users-stateless?shared_secret=`,
                headers: { "Content-Type": "application/json" },
                data: {
                  PublicKeysBase58Check: [user.userpublickey],
                },
              };
              
              try{
                let holdingres = await axios(holdingConfig);
                let creatorCoins = holdingres.data;
                const holdings = creatorCoins.UserList[0].UsersYouHODL;

                let totalMoneny = 0;
                
                holdings.map((item) => {
                  const coinsInCir = nanosToBitClout(
                    item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
                  );
                  const balance = nanosToBitClout(item.BalanceNanos);
                  totalMoneny += USDValueFrom(BitClout_price, coinsInCir, balance);
                })
               
                addedData = [
                  {
                    username:user.username,
                    USD:totalMoneny,
                    timestamp:cDate
                  },
                  ...addedData
                ]
                
              }catch(holdingError){
                console.log('holdingError----------:',holdingError)
              }
           
          }
          var batch = db.batch();

          addedData.forEach((data)=>{
            var docRef = db.collection("userwallet").doc();
            batch.set(docRef,data);
          })
          let result = await batch.commit();
          console.log(result)
        
    });
    console.log("corn:", Date.now());
  }catch(e){
    console.log("rateError---------:",e)
  }
});
*/

cron.schedule("*/30 * * * *", async function () {
  try{
  const usersDb = db.collection("users");
  const userData = await usersDb.get();
  let cDate = Date.now();

  let userList = [];

  userData.docs.forEach((item) => {
    let newItem = {
      docId: item.id,
      ...item.data(),
    };
    userList = [newItem, ...userList];
  });
  let BitClout_price;
      axios
        .all([
          axios.get("https://api.bitclout.com/get-exchange-rate"),
          axios.get("https://blockchain.info/ticker"),
        ])
        .then(async (responseArr) => {
          
          BitClout_price =
            ((responseArr[1].data.USD.last / 100) *
              responseArr[0].data.SatoshisPerBitCloutExchangeRate) /
            1000000;
          console.log('bitcloutprice:',BitClout_price);

          let breakpoint = 0;
          let addedData = [];

          for(let i = 0;i < userList.length; i += 1)
          {
              breakpoint += 1;
              
              if(breakpoint % 30 == 0){
                
                await new Promise(resolve => setTimeout(resolve, 15000))                      
                
              }
              let user = userList[i];
              
                let holdingConfig = {
                  method: "post",
                  url: `https://api.bitclout.com/get-users-stateless?shared_secret=`,
                  headers: { "Content-Type": "application/json" },
                  data: {
                    PublicKeysBase58Check: [user.userpublickey],
                  },
                };
                try{
                  let holdingres = await axios(holdingConfig);
                  
                  let creatorCoins = holdingres.data;

                  const holdings = creatorCoins.UserList[0].UsersYouHODL;
                  let totalMoneny = 0;
                  console.log(holdings)
                  holdings.forEach((item) => {
                 
                    const coinsInCir = nanosToBitClout(
                      item.ProfileEntryResponse.CoinEntry.CoinsInCirculationNanos
                    );
                    const balance = nanosToBitClout(item.BalanceNanos);
                    totalMoneny += USDValueFrom(BitClout_price, coinsInCir, balance);


                    db.collection("log").add({
                      PublicKeyBase58Check:           user.userpublickey,
                      CreatorPublicKeyBase58Check:    item.CreatorPublicKeyBase58Check,
                      CoinPriceBitCloutNanos:         item.ProfileEntryResponse.CoinPriceBitCloutNanos,
                      USD:                            nanosToBitClout(item.ProfileEntryResponse.CoinPriceBitCloutNanos) * BitClout_price,
                      creatorCoinsPublicKey:           item.ProfileEntryResponse.PublicKeyBase58Check,
                      
                      //username:                       user.username.toLowerCase(),
                      time:                           Date.now(),
                    })
                    
                  }); 

                  db.collection("userwallet").add({
                    //username:user.username,
                    userpublickey:user.userpublickey,
                    USD:totalMoneny,
                    timestamp:cDate
                  })

                }catch(holdingErr){
                  console.log('holding-------:',holdingErr)
                }    
            }
          
    });
  }catch(e){
    console.log('price-------:',e)
  }
});

cron.schedule("45 * * * *",async function(){
  
  try{
    
    let users = await User.find()
    let config = {
      method: "get",
      url: `https://api.bitclout.com/api/v1`,
      headers: { "Content-Type": "application/json" },
    };
    let latestBlock = await axios(config);
    
    let height = latestBlock.data.Header.Height;
    let timestampTemp = latestBlock.data.Header.TstampSecs;
    
    
    let limittimestamp = Date.now()/1000 - 70 * 60;
    
    console.log('latestTime:',timestampTemp)
    console.log('limit:',limittimestamp)
    console.log('height:',height)
    
    let newTransactions = [];
    let breakpoint = 0;
    while(timestampTemp > limittimestamp)
    {
      breakpoint += 1;
      console.log(breakpoint)
      if(breakpoint % 10 == 0){
        console.log('breakpoint')
        await new Promise(resolve => setTimeout(resolve, 20000))                      
        console.log('wait')
      }
      height -= 1;
      var blockconfig = {
        method: 'post',
        url: 'https://api.bitclout.com/api/v1/block',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : JSON.stringify({"Height": height,"FullBlock":true})
      };
      try{
      let block = await axios(blockconfig);
      timestampTemp = block.data.Header.TstampSecs;
      let transactions = block.data.Transactions.filter((item)=>{
        return item.TransactionType == 'CREATOR_COIN'
      })
      let d = new Date(timestampTemp * 1000)
      //console.log('Height:',block.data.Header.Height)
      await Promise.all(transactions.map(async(item)=>{
        //console.log(item.TransactionMetadata.TransactorPublicKeyBase58Check)
        if(item.TransactionMetadata && item.TransactionMetadata.AffectedPublicKeys[1] && item.TransactionMetadata.AffectedPublicKeys[1].PublicKeyBase58Check){
        let existUser = users.filter((user)=>{
          return user.userpublickey == item.TransactionMetadata.AffectedPublicKeys[1].PublicKeyBase58Check
        })

        if(existUser.length != 0){
          let user = existUser[0];
          console.log('username:',user.username)
          
          await UserTransaction.deleteMany({
            $and:[
              {userpublickey:user.userpublickey},
              {blockHeight:block.data.Header.Height}
            ]
          })
          
         if(!newTransactions[`${user.userpublickey}`])
         {
          newTransactions[`${user.userpublickey}`] = []
         }
          newTransactions[`${user.userpublickey}`] = [
            {
              ...item,
              timestamp :timestampTemp,
              username  :user.username,
              blockHeight:block.data.Header.Height
            },
            ...newTransactions[`${user.userpublickey}`],
          ]
        }
      }else{
        //console.log(item.TransactionMetadata)
        if(item.TransactionMetadata){
          console.log(item.TransactionMetadata.AffectedPublicKeys)
        }
      }
      }))
      }catch(e){
        console.log(e)
      }
    }
    //console.log(newTransactions)
    //console.log('newtranfinsh')
    //return;
    let addedUserpubkeys = Object.getOwnPropertyNames(newTransactions);
    //console.log(addedUserpubkeys)
    await Promise.all(addedUserpubkeys.map(async(userpubkey)=>{
      if(userpubkey != 'length'){
      
          let addTransactions = [...newTransactions[`${userpubkey}`]];

          
          let lastTransaction = await UserTransaction.find({userpublickey:userpubkey}).sort({index:-1}).limit(1)
        
          addTransactions = addTransactions.sort((a,b)=>{
            return a.timestamp > b.timestamp ?1:-1; 
          })
        
          let newAddArray = []
          let lastIndex = lastTransaction[0].index + 1;
          let lastBlockHeight = lastTransaction[0].blockHeight;
          

          addTransactions.map((transaction)=>{
           
          
            let newItem = {
                username:       transaction.username,
                userpublickey:  userpubkey,
                BitCloutToSellNanos:  transaction.TransactionMetadata.CreatorCoinTxindexMetadata.BitCloutToSellNanos,
                CreatorCoinToSellNanos: transaction.TransactionMetadata.CreatorCoinTxindexMetadata.CreatorCoinToSellNanos,
                transactiontype:transaction.TransactionMetadata.CreatorCoinTxindexMetadata.OperationType == 'buy'?0:1,
                transactorpublickey:transaction.TransactionMetadata.TransactorPublicKeyBase58Check,
                timestamp:      transaction.timestamp,
                index:          lastIndex,
                blockHeight:    transaction.blockHeight
            }
            if(lastBlockHeight < transaction.blockHeight){
              lastBlockHeight = transaction.blockHeight;
            }
            newAddArray = [
                ...newAddArray,
                newItem
            ]
            lastIndex += 1;
          })
          console.log('NewArray:',newAddArray)
          
          await UserTransaction.insertMany(newAddArray);
          await User.updateOne(
            {userpublickey:userpubkey},
            {totaltransaction:lastIndex,index:lastIndex - 1,lastsync:Date.now(),lastBlockHeight:lastBlockHeight},
            
          )
          
        //console.log('tranCron-___________________________')

      }
    })
    )
  }catch(e){
    console.log(e)
  }
  console.log(nodeInfo.data)
});