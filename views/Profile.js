import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { AuthContext } from '../context'

export default function Profile({ navigation }) {
    const { logOut } = React.useContext(AuthContext);

    const logOutAlert = () => {
        Alert.alert('', '¿De verdad quieres salir?', [
            { text: 'Aceptar', onPress: () => logOut() },
            {
                text: 'Cancelar',
                style: 'cancel',
            },

        ]);
    }
    return (

        <View style={styles.container}>

            <Pressable
                onPress={() => { navigation.navigate('Info') }}
                style={[styles.pressableArea, styles.firstButton]}
            >
                <Text
                    style={[styles.text, styles.firstText]}
                >
                    Información del restaurante
                </Text>
            </Pressable>

            <Pressable
                onPress={() => { navigation.navigate('Menu') }}
                style={[styles.pressableArea, styles.secondButton]}
            >
                <Text
                    style={[styles.text, styles.secondText]}
                >
                    Menú del restaurante
                </Text>
            </Pressable>

            <Pressable
                onPress={() => { navigation.navigate('Bank') }}
                style={[styles.pressableArea, styles.thirdButton]}
            >
                <Text
                    style={[styles.text, styles.thirdText]}
                >
                    Cobro digital
                </Text>
            </Pressable>

            <Pressable
                onPress={() => { logOutAlert() }}
                style={[styles.pressableArea, styles.fourthButton]}
            >
                <Text
                    style={[styles.text, styles.fourthText]}
                >
                    Cerrar sesión
                </Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },

    pressableArea: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },

    firstButton: {
        borderBottomColor: "#00A5E3",
        borderRightColor: "#00A5E3",
    },

    secondButton: {
        borderBottomColor: "#C05780",
        borderRightColor: "#C05780",
    },

    thirdButton: {
        borderBottomColor: "#4DD091",
        borderRightColor: "#4DD091",
    },

    fourthButton: {
        borderBottomColor: "#FC6238",
        borderRightColor: "#FC6238",
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    firstText: {
        color: "#00A5E3"
    },

    secondText: {
        color: "#C05780"
    },

    thirdText: {
        color: "#4DD091"
    },

    fourthText: {
        color: "#FC6238"
    }
});
