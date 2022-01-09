import Card from './Card'

function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }) {
  if (!confirmed) {
    return <p>Loading...</p>
  }

  return (
    <div className='grid-x grid-padding-x medium-up-3'>
      <Card label='Infected' value={confirmed.value} date={lastUpdate}></Card>
      <Card label='Recovered' value={recovered.value} date={lastUpdate}></Card>
      <Card label='Deaths' value={deaths.value} date={lastUpdate}></Card>
    </div>
  )
}

export default Cards
