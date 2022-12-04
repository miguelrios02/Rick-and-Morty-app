import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import getRandomNumber from './utils/getRandomNumber'
import axios from 'axios'
import LocationInfo from './componets/LocationInfo'
import LocationFilter from './componets/LocationFilter'
import ErrorMessage from './componets/ErrorMessage'
import ResidentList from './componets/ResidentList'

function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState()
  const [showError, setShowError] = useState(false)
getRandomNumber()
const URL = "https://rickandmortyapi.com/api/location/127"
useEffect(()=>{
const randomDimension = getRandomNumber()
getDataDimension(randomDimension)
},[])

const getDataDimension = (idDimension) =>{
  if(idDimension){
  const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
  axios.get(URL)
  .then(res=> setLocation(res.data))
  .catch(err =>{

    setShowError(true)
    setTimeout(()=>{
      setShowError(false)
    },4200)
    console.log(err)
  } )
}else{
  alert("Ingrese una dimension")
}
}
const handleSubmit= (e) =>{
  e.preventDefault()
  const dimensionSearch = e.target.searchValue.value
  getDataDimension(dimensionSearch)
}

const handleChangeInput=(event)=>{
  setLocationName(event.target.value)
}
const getNewLocation =(URL,name)=>{
  setLocationName(name)
  axios.get(URL)
  .then(res=> setLocation(res.data))
  .catch(err => console.log(err))


}
  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input id="searchValue" value={locationName} type="text" onChange={handleChangeInput} placeholder='seach dimension'/>
        <button type="submit"> Search</button>
        {
          showError ? <ErrorMessage/>:""
        }
      </form>
      
  <LocationInfo location={location}/>
  <LocationFilter locationName={locationName} getNewLocation={getNewLocation}/>
  <ResidentList  location={location}/>
    </div>
  )
}

export default App
