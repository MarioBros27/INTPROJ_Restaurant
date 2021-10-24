import React from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';

export default function Reservacion({ route, navigation }) {
    const { item } = route.params;
    console.log(item)
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>#Personas: {item.personas}</Text>
                <Text style={styles.subtitle}>{item.fecha}</Text>
                <Text style={styles.subtitle}>{item.hora}</Text>
            </View>
            {item.status == "pendiente" &&
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("aceptando")
                    }}
                    title="Aceptar reservación"
                    color="green"
                    accessibilityLabel="Aceptar reservación"
                />
                
            </View>
            }
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("cancelando")
                    }}
                    title="Cancelar reservación"
                    color="red"
                    accessibilityLabel="Cancelar reservación"
                />
                
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    infoContainer: {
        // flex: 1,
        flexDirection: "column",
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 0
    },
    buttonContainer: {
        marginTop: 25
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 12
    }

});