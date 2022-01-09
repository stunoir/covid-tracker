import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
  let changeableUrl = url

  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl)

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    }

    return modifiedData
  } catch (error) {
    console.log('Error in fetch', error)
  }
}

export const fetchDailyData = async () => {
  try {
    const response = await axios.get(`${url}/daily`)
    const data = response.data

    const modData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }))

    return modData
  } catch (error) {
    console.log('Error in fetch daily', error)
  }
}

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`)

    return countries.map((country) => country.name)
  } catch (error) {
    console.log('Error in fetch countries', error)
  }
}