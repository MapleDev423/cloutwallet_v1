import React, {createContext, useContext, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {saveUsername} from './firebaseHelper';

const AutoSaveContext = createContext();

export function useAutoSaveContext() {
  return useContext(AutoSaveContext);
}

export function AutoSaveProvider({children}) {
  // const username = useSelector(state => state.auth?.username);
  const username = 'Nyko';
  const [percentState, setPrecentState] = useState([]);
  const [oldUserWallet, setOldUserWallet] = useState([]);

  useEffect(() => {
    if (username) {
      saveUsername(username);
      getPercentChage();
    }
  }, [username]);

  const getPercentChage = async () => {
    if (username) {
      let agoTime = 24 * 3600 * 1000;
      let rangTime = 3 * 60 * 1000;
      let starttime = Date.now() - agoTime; // 35 * 60 * 1000;

      const dbresponse = firestore
        .collection('log')
        .where('time', '<', starttime + rangTime)
        .where('time', '>', starttime - rangTime)
        .where('username', '==', username.toLowerCase());
      const data = await dbresponse.get();

      let logdata = [];

      data.docs.forEach(item => {
        let newItem = {
          ...item.data(),
        };
        logdata = [newItem, ...logdata];
      });
      //     console.log(logdata)
      let newPercents = [];
      logdata.map(log => {
        let existStates = newPercents.filter(newpercent => {
          return (
            newpercent.creatorCoinsUsername.toLowerCase() ===
            log.creatorCoinsUsername.toLowerCase()
          );
        });
        if (existStates.length === 0) {
          newPercents = [log, ...newPercents];
        }
      });
      //      console.log(newPercents);
      setPrecentState(newPercents);
      let cDate = new Date(Date.now());
      let amtime =
        Date.now() -
        (cDate.getHours() * 3600 +
          cDate.getMinutes() * 60 +
          cDate.getSeconds()) *
          1000;

      //amtime = Date.now() - 1000 * 60 * 10;

      const dbuserWalletResponse = firestore
        .collection('userwallet')
        .where('username', '==', username.toLowerCase())
        .where('timestamp', '>=', amtime - 60000)
        .where('timestamp', '<', amtime + 60000);
      const userWalletData = await dbuserWalletResponse.get();
      let userWallet = [];
      userWalletData.docs.forEach(item => {
        let newItem = {
          ...item.data(),
        };
        userWallet = [newItem, ...userWallet];
      });
      //      console.log(userWallet)
      if (userWallet.length !== 0) {
        setOldUserWallet(userWallet[0]);
      }
    }
  };

  useEffect(() => {
    getPercentChage();
    setInterval(async () => {
      getPercentChage();
    }, 5 * 60 * 1000);
  }, []);

  return (
    <AutoSaveContext.Provider
      value={{
        percentState,
        oldUserWallet,
      }}>
      {children}
    </AutoSaveContext.Provider>
  );
}

/**
 *
 */
