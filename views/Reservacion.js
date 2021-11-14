import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

export default function Reservacion({ route, navigation }) {
    const { item } = route.params;
    const appSettings = require('../app-settings.json');
    const [disableButton, setDisableButton] = React.useState(false)

    const editStatus = (statusIn) => {
        setDisableButton(true)
        axios.put(`${appSettings['backend-host']}/reservations/${item.id}`,
            {
                status: statusIn
            })

            .then(response => {

                alert("Cambio realizado")
                setDisableButton(false)
            })
            .catch(error => {
                setDisableButton(false)
                alert(`There was an error updating the status of the reservation. Error details: ${error}`)
            })
    }
    const cancelAlert = () => {
        Alert.alert('', '¿De verdad quieres cancelar la reservación?', [
            { text: 'Aceptar', onPress: () => editStatus("canceled") },
            {
                text: 'Cancelar',
                style: 'cancel',
            },

        ]);
    }
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                <Text style={styles.subtitle}>#Personas: {item.seats}</Text>
                <Text style={styles.subtitle}>{item.appointment.substr(0, 10)}</Text>
                <Text style={styles.subtitle}>{item.appointment.substr(11, 5)}</Text>
            </View>
            {(item.status == "waiting" || item.status == "canceled") &&
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            editStatus("accepted")
                        }}
                        title="Aceptar reservación"
                        color="green"
                        accessibilityLabel="Aceptar reservación"
                        disabled={disableButton}
                    />

                </View>
            }
            {item.status != "canceled" &&
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            cancelAlert()
                        }}
                        title="Cancelar reservación"
                        color="red"
                        accessibilityLabel="Cancelar reservación"
                        disabled={disableButton}
                    />

                </View>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    parentContainer: {
        // flex: 1,
        flexDirection: "column",
        padding: 20
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginTop: 25
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 22
    }

});
