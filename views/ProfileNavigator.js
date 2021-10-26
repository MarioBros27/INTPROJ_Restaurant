import React from 'react';
import Profile from './Profile'
import RestInfo from './RestInfo'
import RestBank from './RestBank';
import RestMenu from './RestMenu';
import RestItem from './RestItem'
import Browser from './Browser'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ProfileNavigator({ navigation }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Info" options={{title:"Información"}} component={RestInfo} />
            <Stack.Screen name="Bank" options={{title:"Registrar para cobro digital"}} component={RestBank} />
            <Stack.Screen name="Menu" options={{title:"Menú"}} component={RestMenu} />
            <Stack.Screen name="Profile" options={{title:"Perfil"}}component={Profile} />
            <Stack.Screen name="Item" options={{title:""}}component={RestItem} />
        </Stack.Navigator>
    );
}



