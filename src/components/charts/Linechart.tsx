// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import faker from "faker"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Trainee Analytics",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

const data = {
  labels,
  datasets: [
    {
      label: "Automobile",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#F7B12F",
      backgroundColor: "#F7B12F",
    },
    {
      label: "Derekand",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#1E477B",
      backgroundColor: "#1E477B",
    },
  ],
}

export default function LInechart() {
  return (
    <Line
      options={options}
      data={data}
      className='overflow-hidden max-w-full'
    />
  )
}
