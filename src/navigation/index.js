import React from "react";
import StackNavigation from "./Stack";
import { NavigationContainer } from "@react-navigation/native"
import { View, Text } from 'react-native';

export default function Navigation() {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}