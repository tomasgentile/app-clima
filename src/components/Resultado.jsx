import useClima from "../hooks/useClima"

const Resultado = () => {
    const { resultado, icon } = useClima()
    const { name, main } = resultado

    // Grados Kwlvin
    const kelvin = 273.15

    return (
        <div className="contenedor">
            <h2 className="titulo">El clima en {name}:</h2>
            <div className="clima">
                <img src={icon} alt='weather icon'/>
                <p>{parseInt(main.temp - kelvin)}<span>&#x2103;</span></p>
            </div>
            <div className="temp_min_max">
                <p>Min: {parseInt(main.temp_min - kelvin)}<span>&#x2103;</span></p>
                <p>Max: {parseInt(main.temp_max - kelvin)}<span>&#x2103;</span></p>
            </div>
        </div>
    )
}

export default Resultado