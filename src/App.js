import React, { useState, useEffect } from 'react'
//import icons from react-icons
import {
  FaUser,
  FaEnvelopeOpen,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'  //this is the format of the api
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'   //this image is used by default (image not being empty)

function App() {
  //states
  const [loading, setLoading] = useState(true)   //when click on "random user" button the button says loading
  const [eachPerson,setEachPerson] = useState("")  //nothing to show by default
  const [title,setTitle] = useState('name')  //by default when the page loads it shows name of the person as title
  const [value,setValue] = useState('')  //value is name,email,age,address,phone and password

  //fetch function
  const fetchData = async() =>{
    setLoading(true)   //loading state is true before fetch begins
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.results[0])
    const person = data.results[0]
    //we don't need to map since we have one json template format 
    const {first,last} = person.name
    const {email} = person
    const {age} = person.dob
    const {number, name} = person.location.street
    //or  const {street:{number, name}} = person.location
    const {phone} = person
    const {password} = person.login
    const {large} = person.picture
 
  //define the new features
  const newPerson = {
    image:large,
    name: `${first} ${last}`,
    email: email,
    age: age,
    street: `${number} ${name}`,
    phone: phone,
    password:password
  }
  setLoading(false)
  setEachPerson(newPerson)  //pass the newPerson features to setEachPerson
  setTitle('name')  //when image loads at first the title should be 'name'
  setValue(newPerson.name)  //by default the name of the person shows at first
}   

  //call the fetchData function 
  useEffect(()=>{
    fetchData()
  },[])

  const handleChange = (e) =>{
    //dataset returns the data-* attributes on that element
    console.log(e.currentTarget.dataset.label)   //or e.target.datset.label sometimes gives us undefined
    const eachValue = e.currentTarget.dataset.label
    setTitle(eachValue)
    console.log(eachPerson[eachValue])
    setValue(eachPerson[eachValue])
  }


  return (
    <main>
      <div className="block bcg-black"></div>
      <div className='block'>
        <div className='container'>
          <img src={(eachPerson.image)|| defaultImage} alt="random user" className='user-img'/>
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>

          <div className='values-list'>
            <button className='icon' data-label='name' onMouseOver={handleChange}><FaUser /></button>
            <button className='icon' data-label='email' onMouseOver={handleChange}><FaEnvelopeOpen /></button>
            <button className='icon' data-label='age' onMouseOver={handleChange}><FaCalendarTimes /></button>
            <button className='icon' data-label='street' onMouseOver={handleChange}><FaMap /></button>
            <button className='icon' data-label='phone' onMouseOver={handleChange}><FaPhone /></button>
            <button className='icon' data-label='password' onMouseOver={handleChange}><FaLock /></button>
          </div>
 
          {/* if we call fetchData with clicking on random button then it pickes random person every time */}
          <button className='btn' type="btn" onClick={fetchData}>{loading ? "loading" : "random user"}</button>
        </div>
      </div>
    </main>
  )
}

export default App
