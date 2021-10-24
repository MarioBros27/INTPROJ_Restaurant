import React from 'react';
import LogIn from './views/LogIn'
import SignUp from './views/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './views/Profile'
import ProfileNavigator from './views/ProfileNavigator';
import Loading from './views/Loading'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservacionNavigator from './views/ReservacionNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context';
import axios from 'axios'
import Clientes from './views/Clientes'
import Reservaciones from './views/Reservaciones';
import Pagos from './views/Pagos'
import OrdenesNavigator from './views/OrdenesNavigator';
import Ordenes from './views/Ordenes'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const initialLoginState = {
    isLoading: true,
    token: null
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    logIn: async (token) => {
      try {
        await AsyncStorage.setItem('token', token);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', token);
      dispatch({ type: 'LOGIN', token: token });
    },
    logOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },


  }), []);

  React.useEffect(() => {
    setTimeout(async () => {
      let token
      token = null
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: token });
    }, 0)
  }, []);
  if (loginState.isLoading) {
    return (
      <Loading />
    )
  }


  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer>
        {loginState.token !== null ? (

          <Tab.Navigator
            screenOptions={{
              tabBarHideOnKeyboard: true,
              tabBarActiveTintColor: "#fc6c27",
              tabBarInactiveTintColor: "black"
            }}
          >
            <Tab.Screen name="Clientes" component={Clientes} options={{
              title: "Clientes",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="table-chair" color={color} size={size} />
              )
            }} />
            <Tab.Screen name="OrdenesNavigator" component={OrdenesNavigator}

              options={{
                title: "Ordenes",
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="fast-food" color={color} size={size} />
                ),

              }} />

            <Tab.Screen name="Pagos" component={Pagos} options={{
              title: "Historial Pagos",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="attach-money" color={color} size={size} />
              )
            }} />
            <Tab.Screen name="ReservacionesNavigator" component={ReservacionNavigator} options={{
              title: "Reservaciones",
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="format-list-checkbox" color={color} size={size} />
              )
            }} />
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{
              title: "Perfil",
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" color={color} size={size} />
              )
            }} />

          </Tab.Navigator>
        )
          :
          <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn" component={LogIn}
              initialParams={{ setLoggedIn: 42 }}
              options={{ title: 'Press2EatAdmin' }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Crear cuenta' }} />
          </Stack.Navigator>
        }

      </NavigationContainer>
    </AuthContext.Provider>
  )


}

