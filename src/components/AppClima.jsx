import React from 'react'
import Formulario from './Formulario'
import Resultado from './Resultado'
import useClima from "../hooks/useClima"
import Loading from './Loading'

const AppClima = () => {
    const { resultado, cargando, noResultado, icon } = useClima()

    return (
        <>
            <main className='dos-columnas'>
                <Formulario />
                {cargando ? <Loading /> :
                    resultado?.name && Object.keys(icon).length > 0 ? <Resultado /> :
                        noResultado ? <p>{noResultado}</p> : null
                }
            </main>
        </>
    )
}

export default AppClima
