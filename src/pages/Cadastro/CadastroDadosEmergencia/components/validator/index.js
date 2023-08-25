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


export function ValidarCelular(celular) {
    const isValid = celular.length === 18;
    console.log('ValidarCelular - Input:', celular, 'Resultado:', isValid);

    return isValid;
};

export function ValidarVinculo(vinculo) {
    const isValid = vinculo.trim() !== "";
    console.log('ValidarVinculo - Input:', vinculo, 'Resultado:', isValid);

    return isValid;
};
