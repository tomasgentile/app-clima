import { useState, createContext } from 'react'
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })
    const [resultado, setResultado] = useState({})
    const [icon, setIcon] = useState({})
    const [cargando, setCargando] = useState(false)
    const [noResultado, setNoresultado] = useState(false)
    
    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async (datos) => {
        setCargando(true)
        setNoresultado('')
        setResultado({})
        setIcon({})
        if (Object.keys(icon) > 0) {
            console.log('lleno')
        } else {
            console.log('vacio')
        }
        try {
            const { ciudad, pais } = datos
            const appId = import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            const { data } = await axios(url)
            const { lat, lon } = data[0]
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&lang=es`
            const { data: clima } = await axios(urlClima)
            const urlIcon = `https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`
            const resIcon = await fetch(urlIcon)
            const iconBlob = await resIcon.blob()
            const imageObjectURL = URL.createObjectURL(iconBlob)
            setResultado(clima)
            setIcon(imageObjectURL)

        } catch (error) {
            setNoresultado('No hay resultados')
        } finally {
            setCargando(false)
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultado,
                cargando,
                noResultado,
                icon
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export { ClimaProvider }

export default ClimaContext