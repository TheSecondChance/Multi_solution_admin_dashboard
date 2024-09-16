import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { EnrolledUser } from "@/features/enrollment/enrollmentService"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

interface BarChartComponentProps {
  apiData: EnrolledUser[]
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ apiData }) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const traineesByTrainingAndMonth: { [key: string]: number[] } = {}

    apiData.forEach((item) => {
      const training = item.training_type
      const month = new Date(item.enrollment_date).getMonth()
      traineesByTrainingAndMonth[training] =
        traineesByTrainingAndMonth[training] || Array(12).fill(0)
      traineesByTrainingAndMonth[training][month]++
    })

    const labels = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("en", { month: "long" })
    )

    const basicColors = [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(153, 102, 255)",
      "rgb(255, 159, 64)",
    ]

    const datasets = Object.entries(traineesByTrainingAndMonth).map(
      ([training, trainees], index) => ({
        label: training,
        data: trainees,
        backgroundColor: basicColors[index % basicColors.length],
      })
    )

    setChartData({
      labels,
      datasets,
    })
  }, [apiData])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Number of Trainees by Training and Month",
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default BarChartComponent
