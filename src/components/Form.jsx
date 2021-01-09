import React, {useState} from 'react'
import styled from '@emotion/styled'
import {calcularMarca, obtenerDiferenciaValor, obtenerPlan} from '../helper'

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;

`

const Label = styled.label`
    flex: 0 0 100px;
    `

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #1e1e1e;
    -webkit-appearance: none;
`

const InputRatio = styled.input`
    margin: 0 1rem;
`
const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        cursor: pointer;
        background-color: #26C6DA;
    }

`
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem; 
`


export const Form = ({setResumen, setLoading}) => {

    const [data, setData] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, guardarError] = useState(false)

    const {marca, year, plan} = data


    const obtenerInformacion = e => {

        setData({
        ...data,
        [e.target.name] : e.target.value
    })
    }

    const cotizarSeguro = e => {
        e.preventDefault()
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false)

    let resultado = 2000;
    //obtener la diferencia de años
    const diferencia = obtenerDiferenciaValor(year)

    //por cada año restar 3%
    resultado -= ((diferencia * 3 ) * resultado) / 100;

    //Americano 15%
    //asiatico 5%
    //Europeo 30%
    resultado = calcularMarca(marca) * resultado
    //Basico 20%
    //completo 50%
     const incrementoPlan = obtenerPlan(plan)
    resultado = parseFloat( incrementoPlan * resultado).toFixed(2);

    setLoading(true)

    setTimeout(() =>{
        setLoading(false)

        setResumen({
           cotizacion: resultado,
           data
        })
        
    }, 3000)

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {error && <Error>Todos Los Campos Son Obligatorios</Error>}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">--- Seleccione ---</option>
                    <option value="americano">America</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Marca</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}

                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRatio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={obtenerInformacion}

                /> Basico

                <InputRatio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={obtenerInformacion}

                />Completo

            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
    )
}


