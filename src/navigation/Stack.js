import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS
import { Login } from "../pages/Login"

import { EsqueciMinhaSenha } from "../pages/EsqueciMinhaSenha"

import { Cadastro } from "../pages/Cadastro"
import { LoginCadastro } from "../pages/LoginCadastro/index.js"

import { CadastroDadosEmergencia } from "../pages/Cadastro/CadastroDadosEmergencia/index.js"
import { CadastroDadosEndereco } from "../pages/Cadastro/CadastroDadosEndereco/index.js"
import { CadastroDadosPessoais } from "../pages/Cadastro/CadastroDadosPessoais/index.js"
import { CadastroDadosProfissao } from "../pages/Cadastro/CadastroDadosProfissao/index.js"
import { DataStateProvider } from '../pages/Cadastro/components/DataCenter/index.js';
import { DataStateProviderEsqueciMinhaSenha } from "../pages/EsqueciMinhaSenha/components/DataCenter/index"

import Drawer from "./Drawer"

const Stack = createStackNavigator()

export default StackNavigation => {
    return (
        <DataStateProvider>
            <DataStateProviderEsqueciMinhaSenha>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Login" component={Login} />


                    <Stack.Screen name="EsqueciMinhaSenha" component={EsqueciMinhaSenha} />


                    <Stack.Screen name="Cadastro" component={Cadastro} />
                    <Stack.Screen name="LoginCadastro" component={LoginCadastro} />

                    <Stack.Screen name="Dados Pessoais" component={CadastroDadosPessoais} />
                    <Stack.Screen name="Dados Profissao" component={CadastroDadosProfissao} />
                    <Stack.Screen name="Dados Endereco" component={CadastroDadosEndereco} />
                    <Stack.Screen name="Dados Emergencia" component={CadastroDadosEmergencia} />

                    <Stack.Screen name="Home" component={Drawer} />
                </Stack.Navigator>
            </DataStateProviderEsqueciMinhaSenha>
        </DataStateProvider>
    );
}