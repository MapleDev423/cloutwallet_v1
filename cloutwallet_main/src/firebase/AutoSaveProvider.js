import { delBasePath } from "next/dist/next-server/lib/router/router";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "./firebaseconfig";
import { nanosToBitClout } from "../../helpers/nanosToBitClout";
import { saveUsername } from "./FirebaseHelper";
const AutoSaveContext = createContext();

export function useAutoSaveContext() {
  return useContext(AutoSaveContext);
}
const temp = `[{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLfxMNyGMFM97LNJQtuUD9RfRbkfN9GRT5sYGDVD49ifQiSD5LTE","CoinPriceBitCloutNanos":1800903052,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLfxj3kw3Vp8vaQSpCiHkxWzi1zjGRyY5hHGQGe5xS5CeLu9aJVZ","CoinPriceBitCloutNanos":1622458874,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLg9w5xNYKCApHiM4ketHHzMp1xQA7iswpvLH1Zt35MYDbA7to6A","CoinPriceBitCloutNanos":1706060713,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgB1UQTjKReCgQjumHphA49cFaKFPGbaP75oEiPRWGoRfirMS5c","CoinPriceBitCloutNanos":68195357,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgC2E4xeD6dMDHLsHHKRp7M8Wi4ueJV5hu3vesZD4b5F48xHATM","CoinPriceBitCloutNanos":1347194089,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgP8qJrZjBCT28tBhAZAVnNDTYBqpUJmyYxsCNbaaTnuTrfZSXG","CoinPriceBitCloutNanos":1752916744,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgQqkg4F1Z5eFePVVLzkGymdZFCV5DnutV9DQkZ8LnndWAWAmyx","CoinPriceBitCloutNanos":4480543388,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgTmZmFiACC4UP8m4h8D9vZshVTfAGZjbLSA72iT8Zsse9Y4rsd","CoinPriceBitCloutNanos":9125000000,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgXAsgCbP9HXfMUbA9nanP84Yg5zADiF2z4f3GDxngPkg5J4z6Z","CoinPriceBitCloutNanos":9195645776,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgawSJFG7q7SkrqjjFZvNxGzQMhGVkBD4ci2naggvfSy8hZjB7e","CoinPriceBitCloutNanos":3370731529,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLgfioZhY1odrXdpVoAG7ucrzWWzvxxkM1WEYhPUWdyV3EaGTCvH","CoinPriceBitCloutNanos":382481204,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLh41Q7aCSuftcrCYdqUogpx6iVdD3YhaGkYsFcFmQMapUs9g2F7","CoinPriceBitCloutNanos":5413651869,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLh5YfN9aw2So2gmzd4eFAaUgfaWDeCDWUuapZLfe8Huy6NVieac","CoinPriceBitCloutNanos":2334680884,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLh71HGWDH3bx4wjQW5p8Hc9wGiEgFczyGtGAKyjZCWnEWFeDLEb","CoinPriceBitCloutNanos":24848487767,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhTnbjVDSQ6MHRQWRWnygArXUfsG8rXLXmMaSirzRxcFPyrLqo8","CoinPriceBitCloutNanos":13469471144,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhY2DTBcdVXp6T5zWxUxL975PKN3HKuz8hgntmmxydvHA8oe2NF","CoinPriceBitCloutNanos":9160340368,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhh2vtqR5E1YZKp9NTq4addJ8Y4FCdeiUDJUZ3V6BvjztQXoSmS","CoinPriceBitCloutNanos":1995000146,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhj4mjkjkCCLnF168yB6KZ9vVpXkdjrEVUNNrc5cjm5ZwaFRuhv","CoinPriceBitCloutNanos":1390353976,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhqhHMq6vJc5zmzQxiuuwn6QbhhADoc8ypmY5vfQT4XfFrG94AJ","CoinPriceBitCloutNanos":1238566807,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLhr7wX4jJeZYdxXabDN6UjMRxG6otFFqMuEwCFnXXEZJgBtHXCY","CoinPriceBitCloutNanos":3557011092,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiArWkD95DiEwE115U9GhHo7beSvLWCvvcBq1XS5Ji8gvXekw2i","CoinPriceBitCloutNanos":320679662,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiFK6XBjefnG3G8TTjc8Kud3rBsBCENAzbcEiquEZ7pSvYHnv8s","CoinPriceBitCloutNanos":231342845,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiGGxmbkiqoRDHFcUA7axKr3PdvZg7WnhHLt5StxXFbJxQrMHH8","CoinPriceBitCloutNanos":112557301,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiGomJGceG78Jr5oJjruuRiVmNqJopDFHphZLe9PLPA57bae4gB","CoinPriceBitCloutNanos":844592814,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiMM3KFRkMq2JYZRekGA1LTxt63TxWhggqQ1qpCJ63VmKMa75Vr","CoinPriceBitCloutNanos":5326895150,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiaxkHRiATZrLsmMdnz1gxVaV4apd3Dai7FVyBnMFC6PkNdAEcz","CoinPriceBitCloutNanos":3562183460,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLidMrbVi9Lov3eGzWdXNa9pSXqydZct3zHJrvC2HxLTysJz8Lu1","CoinPriceBitCloutNanos":897126381,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLik3sh8YAVinixqnsbLW8YLLeD483aoAzqdRAkzzcJshZVxTLq1","CoinPriceBitCloutNanos":10518360795,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLiywTSNFoh5AUrTRfceAFeaYZsnQKSHRTmuRNGFFLv14LE19BNJ","CoinPriceBitCloutNanos":790525392,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLizSZMLPYhc1jW7ZksTJ15dGZhjvozu8AQdDYzuXsVxvWxh1VCG","CoinPriceBitCloutNanos":2803618597,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLj8GPXZyqFDXqqxGvYp7P1aov6eSUnTGmDyTyuMEGCKf7TZ6sd5","CoinPriceBitCloutNanos":16615050346,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CoinPriceBitCloutNanos":3318715871,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLj8h7JdXasp7hnjaz8YZYxMsW2j4HRKTzbEQ1qmeWMt4mHKgGvg","CoinPriceBitCloutNanos":8119365116,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLj9CiRYSkvB45YhrLCXgErRb9WzReDkN3zsiJcJpyerKaTUdK3D","CoinPriceBitCloutNanos":142061184,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLjAiawCitgPjY24Qsn8neGzm3TnoArpnZMcro4hvTSVUaqaaufy","CoinPriceBitCloutNanos":4980913025,"percent":"100"},{"PublicKeyBase58Check":"BC1YLj8fgyP9x2UfZsHqAKEmddvW3XdwLvudLQy5gi4oe8bVmQ5KEKv","CreatorPublicKeyBase58Check":"BC1YLjJoGWYhT3as5juWizAminVQHUbxhf2nQwzfyfFq4M3tfLYpwLq","CoinPriceBitCloutNanos":152083935,"percent":"100"}]`;

export function AutoSaveProvider({ children }) {
  const username = useSelector((state) => state.auth?.username);
  const [percentState, setPrecentState] = useState([]);
  const [oldUserWallet, setOldUserWallet] = useState([]);

  const [isLogin, setIsLogin] = useState(false);

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

      const dbresponse = db
        .collection(`log`)
        .where("time", "<", starttime + rangTime)
        .where("time", ">", starttime - rangTime)
        .where("username", "==", username.toLowerCase());
      const data = await dbresponse.get();

      let logdata = [];

      data.docs.forEach((item) => {
        let newItem = {
          ...item.data(),
        };
        logdata = [newItem, ...logdata];
      });
      //     console.log(logdata)
      let newPercents = [];
      logdata.map((log) => {
        let existStates = newPercents.filter((newpercent) => {
          return (
            newpercent.creatorCoinsUsername.toLowerCase() ==
            log.creatorCoinsUsername.toLowerCase()
          );
        });
        if (existStates.length == 0) {
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

      const dbuserWalletResponse = db
        .collection(`userwallet`)
        .where("username", "==", username.toLowerCase())
        .where("timestamp", ">=", amtime - 60000)
        .where("timestamp", "<", amtime + 60000);
      const userWalletData = await dbuserWalletResponse.get();
      let userWallet = [];
      userWalletData.docs.forEach((item) => {
        let newItem = {
          ...item.data(),
        };
        userWallet = [newItem, ...userWallet];
      });
      //      console.log(userWallet)
      if (userWallet.length != 0) {
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
      }}
    >
      {children}
    </AutoSaveContext.Provider>
  );
}

/**
 *
 */
