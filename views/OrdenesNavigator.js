import React from 'react';
import Ordenes from './Ordenes'
import Orden from './Orden'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function OrdenesNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Ordenes" >
            <Stack.Screen name="Ordenes" options={{title:"Ordenes"}} component={Ordenes} />
            <Stack.Screen name="Orden" options={{title:"Orden"}} component={Orden} />
        </Stack.Navigator>
    );
}



