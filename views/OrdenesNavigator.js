import React from 'react';
import Ordenes from './Ordenes'
import Orden from './Orden'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function OrdenesNavigator({ navigation,id }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Ordenes" >
            <Stack.Screen name="Ordenes" options={{title:"Ordenes"}} >
                {(props)=>(<Ordenes {...props} id={id}/>)}
                </Stack.Screen>
            <Stack.Screen name="Orden" options={{title:"Orden"}}  >
                {(props)=>(<Orden {...props} id={id}/>)}
                </Stack.Screen>
        </Stack.Navigator>
    );
}



