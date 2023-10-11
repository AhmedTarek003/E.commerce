import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="chart">
      <div className="chart-container">
        <h1 className="chart-title">User Alalytics</h1>
        <ResponsiveContainer width="90%" height="90%">
          <LineChart width={400} height={500} data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey={"_id"} />
            <Tooltip />
            <Line type="monotone" dataKey={"total"} stroke="black" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
