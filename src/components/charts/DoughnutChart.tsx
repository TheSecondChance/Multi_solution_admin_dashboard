import React, { useEffect } from "react"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts/core"
import { PieChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
])

interface DonutChartProps {
  data: { name: string; value: number }[]
  color: string
}

const DoughnutChart: React.FC<DonutChartProps> = ({ data, color }) => {
  useEffect(() => {}, [data])

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 0,
      left: "center",
      orient: "horizontal",
      textStyle: {
        color: color,
      },
    },
    grid: {
      top: 60,
      bottom: 10,
      left: 10,
      right: 10,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  }

  return (
    <ReactECharts
      className='dark:text-white flex flex-col gap-9'
      option={option}
      style={{ height: "300px", width: "100%" }}
    />
  )
}

export default DoughnutChart
