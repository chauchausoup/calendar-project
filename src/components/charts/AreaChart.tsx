import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// Generate random data between -1000 and 1000
const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 2000 - 1000));
};

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 1',
      data: generateRandomData(),
      borderColor: 'rgb(153, 62, 235)',
      backgroundColor: 'rgba(153, 62, 235, 0.5)',
    },
		{
      fill: true,
      label: 'Dataset 2',
      data: generateRandomData(),
      borderColor: 'rgb(53, 62, 35)',
      backgroundColor: 'rgba(53, 62, 35, 0.5)',
    },
  ],
};

export function AreaChart() {
  return <Line options={options} data={data} />;
}
