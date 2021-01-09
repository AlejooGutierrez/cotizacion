import React, { useState } from 'react'
import { Header } from './components/Header'
import styled from '@emotion/styled'
import { Form } from './components/Form'
import { Resumen } from './components/Resumen'
import { Resultado } from './components/Resultado'
import { Spiner } from './components/Spiner'

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`

function App() {

  const [resumen, setResumen] = useState({
    cotizacion: 0,
    data: {
      marac: '',
      year: '',
      plan: ''
    }
  })
  const [loading, setLoading] = useState(false)

  const { cotizacion, data } = resumen

  return (
   <Contenedor>
    <Header titulo="Cotizador de Seguros" />

    <ContenedorFormulario>
      <Form 
        setResumen={setResumen}
        setLoading={setLoading}
      />
      {loading && <Spiner />  }

      <Resumen 
        data={data}
      />
      <Resultado 
        cotizacion={cotizacion}
      />
    </ContenedorFormulario>

   </Contenedor>
  );
}

export default App;
