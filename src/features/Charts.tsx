import { AreaChart } from '@/components/charts/AreaChart';
import { LineChart } from '@/components/charts/LineChart';

export default function Charts() {
  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Charts</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg shadow bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
          <LineChart />
        </div>
        <div className="rounded-lg shadow bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">Area Chart</h2>
          <AreaChart />
        </div>
      </div>
    </div>
  );
}
