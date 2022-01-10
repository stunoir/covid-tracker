import { useEffect, useState } from 'react'
import { fetchDailyData } from '../../api'
// eslint-disable-next-line no-unused-vars
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
        labels: dailyData.slice(Math.max(dailyData.length - 200, 1)).map(({ date }) => date),
        datasets: [
          {
            data: dailyData.slice(Math.max(dailyData.length - 200, 1)).map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            fill: true,
            font: {
              family: 'Montserrat',
            },
          },
          {
            data: dailyData.slice(Math.max(dailyData.length - 200, 1)).map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
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
            backgroundColor: ['rgba(0, 0, 255, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
            borderColor: ['rgba(0, 0, 255, 0.4)', 'rgba(0, 255, 0, 0.4)', 'rgba(255, 0, 0, 0.4'],
            borderWidth: 3,
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
