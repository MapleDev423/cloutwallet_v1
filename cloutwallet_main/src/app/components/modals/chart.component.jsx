import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { nanosToBitClout } from "../../../../helpers/nanosToBitClout";

const LineGraph = ({ username }) => {
  const [timelist, setTimeList] = useState([]);
  const [pricelist, setPriceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile);

  const { profileData } = profile;
  const bitCloutPrice = profileData.data.BitClout_price;

  const getClosetTransaction = (ts, transactions) => {
    for (let i = 0; i < transactions.length; i++) {
      if (ts < transactions[i].timestamp) {
        return i;
      }
    }
    return -1;
  };
  const getPriceChange = (ts1, ts2, transactions) => {
    let t1index = getClosetTransaction(ts1, transactions);
    let t2index = getClosetTransaction(ts2, transactions);

    if (t1index != -1 && t1index != 0 && t2index != -1 && t2index != 0) {
      let tran1 = transactions[t1index - 1];
      let tran2 = transactions[t2index - 1];
      return tran2.price / tran1.price;
    } else {
      return 1;
    }
  };

  const getDate = (t) => {
    let dt = new Date(t);
    return dt.toString().substring(4, 10);
  };
  useEffect(() => {
    setLoading(true);

    //  axios
    // .all([
    //     axios.get("https://api.bitclout.com/get-exchange-rate"),
    //     axios.get("https://blockchain.info/ticker"),
    // ])
    // .then((responseArr) => {
    //     let BitClout_price =
    //     ((responseArr[1].data.USD.last / 100) *
    //         responseArr[0].data.SatoshisPerBitCloutExchangeRate) /
    //     1000000;
    axios
      .get(`https://api.bitcloutsignal.com/history/${username}`)
      .then((res) => {
        let data = res.data;
        let logs = data.logs;
        let timelisttemp = [];
        let pricelisttemp = [];
        let transactionlist = [];
        let circulation = 0;
        //console.log(logs)
        for (let i = 0; i < logs.length; i++) {
          circulation += logs[i].newCoins;
          transactionlist[i] = {
            timestamp: logs[i].timestamp * 1000,
            price: bitCloutPrice * 0.003 * circulation * circulation,
          };
        }
        //  console.log(transactionlist)
        //  if(transactionlist.length >= 30) {
        let starttime = transactionlist[0].timestamp;
        let endtime = transactionlist[transactionlist.length - 1].timestamp;
        let t = 1;
        let diff = 3600 * 12 * 1000;
        let index = 0;
        for (let i = starttime; i < endtime; i += diff) {
          let change = getPriceChange(i, i + diff, transactionlist);
          //                            if(!isNaN(change * t)) {
          //                                pricelisttemp[index] = change * t;
          let closetIndex = getClosetTransaction(i, transactionlist);
          if (closetIndex == -1) {
            pricelisttemp[index] = transactionlist[0].price;
          } else {
            pricelisttemp[index] = transactionlist[closetIndex].price;
          }

          timelisttemp[index] = getDate(i);
          //                                t = pricelisttemp[index];
          index++;
          //                            }
        }
        setPriceList(pricelisttemp);
        setTimeList(timelisttemp);
        /*
                    } else {
                        let starttime = transactionlist[0].timestamp;
                        let endtime = transactionlist[transactionlist.length - 1].timestamp;
                        let t = 1;
                        let diff = 3600 * 12 * 1000
                        let index = 0;
                        for (let i = starttime; i < endtime; i += diff) {
                            let change = getPriceChange(i, i + diff, transactionlist);
                            if(!isNaN(change * t)) {
                                pricelisttemp[index] = change * t;
                                timelisttemp[index] = getDate(i);
                                t = pricelisttemp[index];
                                index++;
                            }
                        }
                        setPriceList(pricelisttemp);
                        setTimeList(timelisttemp)
                    }
                    */
        setLoading(false);
      });
    // });
  }, [username]);

  let data = {
    labels: timelist,
    datasets: [
      {
        label: username,
        fill: true,
        backgroundColor: "#0064ff",
        borderColor: `#70a8ff`,
        borderWidth: 1,
        borderCapStyle: "butt",
        borderJoinStyle: "miter",
        pointBorderColor: `black`,
        pointBackgroundColor: `#000`,
        pointBorderWidth: 1,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: `#000`,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        data: pricelist,
      },
    ],
  };

  return (
    <>
      <Line
        data={loading ? {} : data}
        height={200}
        width={500}
        options={{ maintainAspectRatio: true }}
      />
    </>
  );
};
export default LineGraph;
