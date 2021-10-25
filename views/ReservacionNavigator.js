import React from 'react';
import Reservacion from './Reservacion';
import Reservaciones from './Reservaciones'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ReservacionNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Reservaciones" >
            <Stack.Screen name="Reservaciones" options={{title:"Reservaciones"}} component={Reservaciones} />
            <Stack.Screen name="Reservacion" options={{title:"Reservacion"}} component={Reservacion} />
        </Stack.Navigator>
    );
}



