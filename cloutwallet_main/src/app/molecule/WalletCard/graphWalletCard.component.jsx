import { Line } from "react-chartjs-2";
import { Style } from "./graphWalletCard.styles";
import { getTotalPriceChange } from "../../../firebase/FirebaseHelper" 
import { useState, useEffect } from "react";


const GraphWalletCard = ({ dark }) => {
  const [timelist,setTimeList] = useState([]);
  const [pricelist,setPriceList] = useState([]);
  
  const [priceHistory,setPriceHistory] = useState([]);

  useEffect(async() => {
  
    if (localStorage.getItem("identity") === null) {
  
      Router.push("/login");
    } else {
  
      let paloadtemp = JSON.parse(localStorage.getItem("identity"))
  

      if(paloadtemp?.publicKey){
  
        let ptemp = await getTotalPriceChange(paloadtemp?.publicKey)
        
        let phistory = [...ptemp]
        phistory = phistory.sort((a,b)=>{
          return a.timestamp - b.timestamp
        })
        setPriceHistory(phistory)
      }
    }
  }, []);

  useEffect(()=>{
    
    if(priceHistory.length != 0){
      
      let timelisttemp = [];
      let pricelisttemp = [];
      for(let i = 0;i < priceHistory.length;i++){
        timelisttemp = [
          ...timelisttemp,
          getDate(priceHistory[i].timestamp)
        ]
        pricelisttemp = [
          ...pricelisttemp,
          priceHistory[i].USD
        ]
      }
      setTimeList(timelisttemp)
      setPriceList(pricelisttemp)
      
    }else
    {
      setTimeList([])
      setPriceList([])
    }
  },[priceHistory])

 const getDate = (t) =>{
    let dt = new Date(t);
    return dt.toString().substring(4,10);
  }
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
        ticks: { 
          beginAtZero: true,
          color: `${dark ? "#E0E0E0" : "#828282"}`,
        },
        grid: {
          borderDash: [4, 4],
          color: "transparent",
          display: false,
        },
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

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, "rgba(72, 146, 254, 0.3)");
    gradient.addColorStop(0.12, "rgba(72, 146, 254, 0.0)");

    return {
      labels: timelist,
      datasets: [
        {
          data: pricelist,
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
        },
      ],
    };
  };

  return (
    <Style.LineCanvas dark={dark}>
      <div className="gw-content">
        <p>Portfolio Value Chart</p>
        <div className="gw-graph">
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </Style.LineCanvas>
  );
};

export default GraphWalletCard;
