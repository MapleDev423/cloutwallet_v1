import { Line, defaults } from "react-chartjs-2";
import { Style } from "./lineChart.styles";

defaults.font.family = "Circular Std";

const LineChart = ({data, label, options }) => {
  const gardData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, "rgba(72, 146, 254, 0.4)");
    gradient.addColorStop(0.55, "rgba(72, 146, 254, 0.0)");

    return {
      labels: (label.length > 0 ? [...label] : []),
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
          data: (data.length > 0 ? [...data] : []),
        },
      ],
    };
  };

  return (
    <Style.LineCanvas>
      <Line data={gardData} options={options} height={100} width={400} />
    </Style.LineCanvas>
  );
};

export default LineChart;
