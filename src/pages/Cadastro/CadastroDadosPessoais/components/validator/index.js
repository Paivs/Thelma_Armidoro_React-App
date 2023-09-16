import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export function ValidarNome(nome) {
    const trimmedString = nome.trim();
    const wordsArray = trimmedString.split(' ');
    const nonEmptyWordsArray = wordsArray.filter(word => word.length > 0);

    const isValid = nonEmptyWordsArray.length >= 2;
    console.log('ValidarNome - Input:', nome, 'Resultado:', isValid);

    return isValid;
};

export function ValidarEmail(email) {
    let isValidEmail = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValidEmail = emailRegex.test(email);

    const isValid = isValidEmail;
    console.log('ValidarEmail - Input:', email, 'Resultado:', isValid);

    return isValid;
};

export function ValidarDataNascimento(inputString) {
    let isValid = false;
    if (inputString.length !== 10) {
        console.log('ValidarDataNascimento - Input:', inputString, 'Resultado:', isValid);
        return isValid;
    }else{
        isValid = true;
    }
    return isValid;
};

export function ValidarCPF(cpf) {
    const isValid = cpf.length === 14;
    console.log('ValidarCPF - Input:', cpf, 'Resultado:', isValid);

    return isValid;
};

export function ValidarCelular(celular) {
    const isValid = celular.length === 18;
    console.log('ValidarCelular - Input:', celular, 'Resultado:', isValid);

    return isValid;
};

export function ValidarTelefoneFixo(telefone) {
    const isValid = telefone.length === 17 || telefone.length === 0;
    console.log('ValidarTelefoneFixo - Input:', telefone, 'Resultado:', isValid);

    return isValid;
};

export function ValidarNacionalidade(nacionalidade) {
    const isValid = nacionalidade.trim() !== "";
    console.log('ValidarNacionalidade - Input:', nacionalidade, 'Resultado:', isValid);

    return isValid;
};
