import React from 'react';
import Profile from './Profile'
import RestInfo from './RestInfo'
import RestBank from './RestBank';
import RestMenu from './RestMenu';
import RestItem from './RestItem'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ProfileNavigator({ navigation, id }) {


    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen name="Info" options={{ title: "Información" }} >
                {(props) => (<RestInfo {...props} id={id} />)
                }
            </Stack.Screen>
            <Stack.Screen name="Bank" options={{ title: "Registrar para cobro digital" }}  >
                {(props) => (<RestBank {...props} id={id} />)
                }
            </Stack.Screen>
            <Stack.Screen name="Menu" options={{ title: "Menú" }}  >
                {(props) => (<RestMenu {...props} id={id} />)
                }
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ title: "Perfil" }} component={Profile} />
            <Stack.Screen name="Item" options={{ title: "" }}  >
                {(props) => (<RestItem {...props} id={id} />)
                }
            </Stack.Screen>
        </Stack.Navigator>
    );
}



