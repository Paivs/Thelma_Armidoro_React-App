import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import DiarioEmocoes from "../pages/DiarioEmocoes/index.js"
import DiarioSonhos from "../pages/DiarioSonhos/index.js"
import Lembretes from "../pages/Lembretes/index.js"
import MinhaConta from "../pages/MinhaConta/index.js"

import {Entypo, Feather} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

export default function ShowBottomTabs(){
    return(
        <Tab.Navigator 
            screenOptions={{
                tabBarActiveTintColor: "#FFF",
                //tabBarInactiveTintColor: "#FF1",
                tabBarStyle:{
                    backgroundColor: "#121212",
                    borderTopColor: "transparent",
                    paddingBottom: 5,
                    paddingTop: 5,
                }, 
            }
        }
        >
            <Tab.Screen 
            name="Diário de Emocoes" 
            component={DiarioEmocoes}
            options={{
                tabBarIcon: ({size, color}) => (
                    <Entypo name="home" size={size} color={color}/>
                )}
            }
            />

            <Tab.Screen 
            name="Diário dos Sonhos" 
            component={DiarioSonhos}
            options={{
                tabBarIcon: ({size, color}) => (
                    <Feather name="search" size={size} color={color}/>
                )}
            }/>

            <Tab.Screen 
            name="Lembretes" 
            component={Lembretes}
            options={{
                tabBarIcon: ({size, color}) => (    
                    <Feather name="search" size={size} color={color}/>
                )}
            }/>

            <Tab.Screen 
            name="Minha Conta" 
            component={MinhaConta}
            options={{
                tabBarIcon: ({size, color}) => (
                    <Feather name="user" size={size} color={color}/>
                )}
            }/>

        </Tab.Navigator>
    )
}