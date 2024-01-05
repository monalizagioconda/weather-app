import { useState } from 'react'
import './Form.css'

const Form = ({ onCity }) => {
    const [city, setCity] = useState()

    const handleSubmit = event => {
        event.preventDefault()
        onCity(city)
    }

    const handleChange = event => {
        setCity(event.target.value) // event.target wskazuje na inputa, a value na wartość w inpucie
    }

    return (
        <form className="weatherForm" onSubmit={handleSubmit}>
            <input className="cityInput" placeholder="Enter City" onChange={handleChange}/>
            <button type="submit">Get weather</button>
        </form>
    )
}

export default Form