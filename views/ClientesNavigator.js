import React from 'react';
import Clientes from './Clientes';
import Cliente from './Cliente'
import CodeForClient from './CodeForClient'
import ClientNew from './ClientNew'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClientesNavigator({ navigation, id }) {

    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Clientes" >
            <Stack.Screen name="Clientes" options={{ title: "Clientes" }} >
                {(props) => (<Clientes {...props} id={id} />)}
            </Stack.Screen>
            <Stack.Screen name="Cliente" options={{ title: "Cliente" }}  >
                {(props) => (<Cliente {...props} id={id} />)}
            </Stack.Screen>
            <Stack.Screen name="CodeForClient" options={{ title: "Código QR" }} component={CodeForClient} />
            <Stack.Screen name="ClientNew" options={{ title: "Check In" }}  >
                {(props) => (<ClientNew {...props} id={id} />)}
            </Stack.Screen>
        </Stack.Navigator>
    );
}



