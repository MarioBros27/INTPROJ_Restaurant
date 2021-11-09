import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function RestBank({ navigation }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Contacta Press2Eat para registrarte y poder recibir pagos desde la app, al correo: querollopanda@hotmail.com</Text>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    buttonContainer:{

    }

});
