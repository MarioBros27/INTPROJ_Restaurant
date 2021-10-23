import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context'

export default function Profile({ navigation }) {
    const [token, setToken] = React.useState("")
    const { logOut } = React.useContext(AuthContext);

    React.useEffect(() => {
        setTimeout(async () => {

            try {
                let tokenT = await AsyncStorage.getItem('token');
                setToken(tokenT)
            } catch (e) {
                console.log(e);
            }
            // dispatch({ type: 'RETRIEVE_TOKEN', token: token });
        }, 0)
    }, [])
    return (

        <View style={styles.container}>

            {/* <Text>{token}</Text> */}
            <Button
                onPress={() => {navigation.navigate('Info') }}
                title="Info restaurante"
                color="#333"
                accessibilityLabel="Información del restaurante"
                style={styles.wideButton}
            />
            <View
                style={{
                    marginBottom: 10
                }}
            />
            <Button
                onPress={() => { navigation.navigate('Menu')}}
                title="Menu"
                color="#000"
                accessibilityLabel="Menú del restaurante"
                style={styles.wideButton}
            />
            <View
                style={{
                    marginBottom: 20,
                }}
            />
            <Button
                onPress={() => { navigation.navigate('Bank')}}
                title="Cuenta de banco"
                color="#333"
                accessibilityLabel="Cuenta de banco"
                style={styles.wideButton}
            />
            <View
                style={{
                    marginBottom: 70,
                }}
            />
            <Button
                onPress={() => { logOut() }}
                title="Cerrar sesión"
                color="red"
                accessibilityLabel="Cerrar sesión"
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {

        marginTop: 20
    },


});
