import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export function ValidarCurso(curso) {
    const isValid = curso.trim() !== "";
    console.log('ValidarCurso - Input:', curso, 'Resultado:', isValid);

    return isValid;
};

export function ValidarProfissao(profissao) {
    const isValid = profissao.trim() !== "";
    console.log('ValidarProfissao - Input:', profissao, 'Resultado:', isValid);

    return isValid;
};

export function ValidarCargo(cargo) {
    const isValid = cargo.trim() !== "";
    console.log('ValidarCargo - Input:', cargo, 'Resultado:', isValid);

    return isValid;
};
