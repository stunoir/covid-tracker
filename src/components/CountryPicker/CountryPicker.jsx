import { useEffect, useState } from 'react'
import { fetchCountries } from '../../api'
import './CountryPicker.css'

function CountryPicker({ handleCountryChange }) {
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    const callFetch = async () => {
      const dataGrabbed = await fetchCountries()
      setCountryData(dataGrabbed)
    }

    callFetch()
  }, [setCountryData])

  return (
    <div>
      <form className='form-control'>
        <label className='form-label hide-for-small-only' htmlFor='ddlCountry'>
          Select a country
        </label>
        <select id='ddlCountry' className='form-select' onChange={(e) => handleCountryChange(e.target.value)}>
          <option value=''>Global</option>
          {countryData.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default CountryPicker
