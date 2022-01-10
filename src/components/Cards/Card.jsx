import CountUp from 'react-countup'
import './Cards.css'

function Card({ label, value, date }) {
  return (
    <div className='cell'>
      <div className={`card card--${label.toLowerCase()}`}>
        <h2>{label}</h2>
        <p className='count'>
          {value !== 0 ? <CountUp start={0} end={value} duration={2.5} separator=','></CountUp> : 'No values'}
        </p>
        <p>{new Date(date).toDateString()}</p>
        <p>Number of {label}</p>
      </div>
    </div>
  )
}

export default Card
