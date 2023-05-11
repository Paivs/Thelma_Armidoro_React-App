import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS
import { Login } from "../pages/Login"
import { Cadastro } from "../pages/Cadastro"
import { LoginCadastro } from "../pages/LoginCadastro/index.js"

import { CadastroDadosEmergencia } from "../pages/Cadastro/CadastroDadosEmergencia/index.js"
import { CadastroDadosEndereco } from "../pages/Cadastro/CadastroDadosEndereco/index.js"
import { CadastroDadosPessoais } from "../pages/Cadastro/CadastroDadosPessoais/index.js"
import { CadastroDadosProfissao } from "../pages/Cadastro/CadastroDadosProfissao/index.js"
import { DataStateProvider } from '../pages/Cadastro/components/DataCenter/index.js';

import ShowBottomTabs from "./Bottom"

const Stack = createStackNavigator()

export default StackNavigation => {
    return (
        <DataStateProvider>
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Cadastro" component={Cadastro}/>
            <Stack.Screen name="LoginCadastro" component={LoginCadastro}/>
            
            <Stack.Screen name="Dados Pessoais" component={CadastroDadosPessoais}/>
            <Stack.Screen name="Dados Profissao" component={CadastroDadosProfissao}/>
            <Stack.Screen name="Dados Endereco" component={CadastroDadosEndereco}/>
            <Stack.Screen name="Dados Emergencia" component={CadastroDadosEmergencia}/>

            <Stack.Screen name="MinhaConta" component={ShowBottomTabs} />
        </Stack.Navigator>
        </DataStateProvider>
    );
}