import React from 'react';
import Clientes from './Clientes';
import Cliente from './Cliente'
import CodeForClient from './CodeForClient'
import ClientNew from './ClientNew'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClientesNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Clientes" >
            <Stack.Screen name="Clientes" options={{title:"Clientes"}} component={Clientes} />
            <Stack.Screen name="Cliente" options={{title:"Cliente"}} component={Cliente} />
            <Stack.Screen name="CodeForClient" options={{title:"Código QR"}} component={CodeForClient} />
            <Stack.Screen name="ClientNew" options={{title:"Check In"}} component={ClientNew} />
        </Stack.Navigator>
    );
}



