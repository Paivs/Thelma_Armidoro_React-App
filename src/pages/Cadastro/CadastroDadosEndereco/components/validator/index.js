import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';

function parseToString(value) {
    if (typeof value === 'number') {
        return value.toString();
    } else if (typeof value === 'string') {
        return value;
    } else {
        return '';
    }
}

export function ValidarCEP(cep) {
    const isValid = parseToString(cep).trim() !== "" && cep.length == 8;
    console.log('ValidarCEP - Input:', cep, 'Resultado:', isValid);
    return isValid;
}

export function ValidarLogradouro(logradouro) {
    const isValid = parseToString(logradouro).trim() !== "";
    console.log('ValidarLogradouro - Input:', logradouro, 'Resultado:', isValid);
    return isValid;
}

export function ValidarBairro(bairro) {
    const isValid = parseToString(bairro).trim() !== "";
    console.log('ValidarBairro - Input:', bairro, 'Resultado:', isValid);
    return isValid;
}

export function ValidarNumero(numero) {
    const isValid = parseToString(numero).trim() !== "";
    console.log('ValidarNumero - Input:', numero, 'Resultado:', isValid);
    return isValid;
}

export function ValidarComplemento(complemento) {
    const isValid = true
    return isValid;
}

export function ValidarCidade(cidade) {
    const isValid = parseToString(cidade).trim() !== "";
    console.log('ValidarCidade - Input:', cidade, 'Resultado:', isValid);
    return isValid;
}

export function ValidarEstado(estado) {
    const isValid = parseToString(estado).trim() !== "" && estado.length <= 3;
    console.log('ValidarEstado - Input:', estado, 'Resultado:', isValid);
    return isValid;
}

export function ValidarPais(pais) {
    const isValid = parseToString(pais).trim() !== "";
    console.log('ValidarPais - Input:', pais, 'Resultado:', isValid);
    return isValid;
}
