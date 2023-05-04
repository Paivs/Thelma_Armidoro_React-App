import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS - TELAS
import { Login } from "../pages/Login"
import { Cadastro } from "../pages/Cadastro"
import ShowBottomTabs from "./Bottom"

const Stack = createStackNavigator()

export default StackNavigation => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Cadastro" component={Cadastro}/>
            <Stack.Screen name="MinhaConta" component={ShowBottomTabs} />
        </Stack.Navigator>
    );
}