import { useEffect, useState } from 'react'
import { fetchDailyData } from '../../api'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar } from 'react-chartjs-2'
import './Chart.css'

function Chart({ data: { confirmed, deaths, recovered }, country }) {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const callFetch = async () => {
      const dataGrabbed = await fetchDailyData()
      setDailyData(dataGrabbed)
    }

    callFetch()
  }, [])

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
            font: {
              family: 'Montserrat',
            },
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            backgroundColor: 'rgba(255, 0, 0, .2)',
            fill: false,
            font: {
              family: 'Montserrat',
            },
          },
        ],
      }}
    ></Line>
  ) : null

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [confirmed.value, recovered.value, deaths.value],
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            font: {
              family: 'Montserrat',
            },
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
          font: {
            family: 'Montserrat',
          },
        },
      }}
    ></Bar>
  ) : null

  return <div className='container-chart'>{country ? barChart : lineChart}</div>
}

export default Chart
