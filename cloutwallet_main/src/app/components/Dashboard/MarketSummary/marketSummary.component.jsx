import LineChart from "../../../molecule/LineChart/lineChart.component";
import { Style } from "./marketSummary.styles";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_USER_TRANSACTIONS } from "../../../../graphql/UserTransaction-graphql";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function MarketSummary({ holdingUsers, dark }) {
  const [getUserTransaction, { loading, data }] = useLazyQuery(
    GET_USER_TRANSACTIONS
  );

  const [timelist, setTimeList] = useState([]);
  const [pricelist, setPriceList] = useState([]);

  const [currentPubKey, setCurrentPubKey] = useState("");
  //console.log(holdingUsers);

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
    if (currentPubKey != "") {
      getUserTransaction({
        variables: {
          userpublickey: currentPubKey,
        },
      });
    }
  }, [currentPubKey]);

  useEffect(() => {
    // console.log('data:',data)
    if (
      data?.user_transaction &&
      data?.user_transaction.length != 0 &&
      data?.ExchangeRate
    ) {
      let bitCloutPrice = data.ExchangeRate.BitCloutUSDValue;

      let trantemp = data.user_transaction;
      let logs = [];
      let prvlocked = 0;
      let prvcirculation = 0;
      for (let i = 0; i < trantemp.length; i++) {
        let locked = 0;
        let circulation = 0;
        if (trantemp[i].transactiontype == 0) {
          let templock =
            (trantemp[i].BitCloutToSellNanos / 1000000000) * 0.9999;
          templock = Math.floor(templock * 1000000000) / 1000000000;
          locked = prvlocked + templock;
          circulation = Math.pow(locked, 0.33333333333333333) * 10;
        } else {
          let coins =
            Math.ceil(trantemp[i].CreatorCoinToSellNanos) / 1000000000;
          circulation = prvcirculation - coins;
          locked = Math.pow(circulation, 3) / 1000;
        }
        logs = [
          ...logs,
          {
            locked: locked,
            circulation: circulation,
            coins: circulation - prvcirculation,
            timestamp: trantemp[i].timestamp,
          },
        ];
        prvlocked = locked;
        prvcirculation = circulation;
      }

      let timelisttemp = [];
      let pricelisttemp = [];
      let transactionlist = [];
      let circulation = 0;
      for (let i = 0; i < logs.length; i++) {
        circulation += logs[i].coins;
        transactionlist[i] = {
          timestamp: logs[i].timestamp * 1000,
          price: bitCloutPrice * 0.003 * circulation * circulation,
        };
      }
      //console.log(transactionlist)
      let starttime = transactionlist[0].timestamp;
      let endtime = transactionlist[transactionlist.length - 1].timestamp;
      let t = 1;
      let diff = 3600 * 12 * 1000;
      let index = 0;
      for (let i = starttime; i < endtime; i += diff) {
        let change = getPriceChange(i, i + diff, transactionlist);
        let closetIndex = getClosetTransaction(i, transactionlist);
        if (closetIndex == -1) {
          pricelisttemp[index] = transactionlist[0].price;
        } else {
          pricelisttemp[index] = transactionlist[closetIndex].price;
        }

        timelisttemp[index] = getDate(i);
        index++;
      }

      setPriceList(pricelisttemp);
      setTimeList(timelisttemp);
    } else {
      setPriceList([]);
      setTimeList([]);
    }
  }, [data]);

  const onUpdateChart = (publicKey) => {
    setCurrentPubKey(publicKey);
  };

  const linedata = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, "rgba(72, 146, 254, 0.3)");
    gradient.addColorStop(0.12, "rgba(72, 146, 254, 0.0)");

    return {
      labels: timelist,
      datasets: [
        {
          backgroundColor: gradient, // Put the gradient here as a fill color
          tension: 0.25,
          borderColor: "#4892FE",
          borderWidth: 2,
          borderJoinStyle: "round",
          pointRadius: 0,
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(68, 204, 153, 0.9)",
          pointBorderWidth: 0,
          fill: "start",
          data: pricelist,
        },
      ],
    };
  };
  let chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          borderDash: [8, 4],
          color: "transparent",
          display: false,
        },
        ticks: {
          color: `${dark ? "#E0E0E0" : "#828282"}`,
        },
      },
      y: {
        ticks: { display: false },
        grid: {
          borderDash: [4, 4],
          color: "transparent",
          display: false,
        },
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <Style.Container dark={dark}>
      <h1>Market Overview</h1>
      <div className="ms-line-chart">
        <h2 className="subtitle">Creators</h2>
        <div className="ms-creators">
          {holdingUsers !== undefined
            ? holdingUsers.slice(0, 8).map((item) => (
                <img
                  src={item.ProfileEntryResponse.ProfilePic}
                  alt={item.ProfileEntryResponse.Username}
                  onClick={() => {
                    onUpdateChart(
                      item.ProfileEntryResponse.PublicKeyBase58Check
                    );
                  }}
                />
              ))
            : ""}
        </div>
        <div className="ms-chart-size">
          <LineChart linedata={linedata} />
        </div>
      </div>
    </Style.Container>
  );
}

export default MarketSummary;
