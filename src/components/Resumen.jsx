import React from 'react'
import styled from '@emotion/styled'
import { LetterCase } from '../helper';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838f;
    color: #fff;
    margin-top: 1rem;

`

export const Resumen = ({ data }) => {

    const { marca, year, plan } = data;

    if (marca === '' || year === '' || plan === '') return null;

    return (
        <ContenedorResumen>
            <h2>Resumen de Cotización</h2>
            <ul>
                <li>Marca: {LetterCase(marca)}</li>
                <li>Plan: {LetterCase(plan)}</li>
                <li>Año del Auto: {LetterCase(year)}</li>
            </ul>
        </ContenedorResumen>
    )
}
