import { useEffect, useState } from 'react'
import { fetchData } from './api/'
import './App.css'
import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import titleImage from './assets/image.png'

function App() {
  const [data, setData] = useState([])
  const [country, setCountry] = useState('')

  useEffect(() => {
    const callFetch = async () => {
      const dataGrabbed = await fetchData()
      setData(dataGrabbed)
    }

    callFetch()
  }, [])

  const handleCountryChange = async (country) => {
    const dataGrabbed = await fetchData(country)
    setData(dataGrabbed)
    setCountry(country)
  }

  return (
    <div className='grid-container animated fadeIn'>
      <header>
        <div className='grid-x grid-padding-x'>
          <div className='medium-8 cell'>
            <img className='logo' alt='App title' src={titleImage}></img>
            <h1 className='show-for-sr'>Covid Tracker App</h1>
          </div>
          <div className='medium-4 align-self-bottom cell'>
            <CountryPicker handleCountryChange={handleCountryChange}></CountryPicker>
          </div>
        </div>
      </header>
      <main>
        <Cards data={data}></Cards>
        <div className='grid-x grid-padding-x'>
          <div className='medium-12 cell'>
            <Chart country={country} data={data}></Chart>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
