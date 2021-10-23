import React from 'react';
import Pago from './Pago';
import Pagos from './Pagos'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function PagosNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Pagos" >
            <Stack.Screen name="Pagos" options={{title:"Pagos"}} component={Pagos} />
            <Stack.Screen name="Pago" options={{title:"Pago"}} component={Pago} />
        </Stack.Navigator>
    );
}



