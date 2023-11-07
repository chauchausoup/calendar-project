import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
      label: 'Dataset 1',
      data: generateRandomData(),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: generateRandomData(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
		{
      label: 'Dataset 3',
      data: generateRandomData(),
      borderColor: 'rgb(155, 99, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 4',
      data: generateRandomData(),
      borderColor: 'rgb(33, 112, 35)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
