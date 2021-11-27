import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

        <View style={styles.container}>

            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold" }}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>

            <View style={styles.rowContainer}>
                <MaterialIcons style={styles.icon} name="groups" color={"#6C88C4"} size={20} />
                <Text style={styles.subtitle}>{item.seats} personas</Text>
            </View>

            <View style={[styles.rowContainer, { marginBottom: 10 }]}>
                <MaterialIcons style={styles.icon} name="event" color={"#6C88C4"} size={20} />
                <Text style={styles.subtitle}>{new Date(Date.parse(item.appointment)).toString().slice(4,21)}</Text>
            </View>

            {(item.status == "waiting" || item.status == "canceled") &&
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            editStatus("accepted")
                        }}
                        accessibilityLabel="Aceptar reservación"
                        disabled={disableButton}
                        style={[styles.acceptButton, { width: '80%', marginBottom: 10 }]}
                    >
                        <Text style={styles.buttonText}>Aceptar</Text>
                    </Pressable>
                </View>
            }
            {item.status != "canceled" &&
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            cancelAlert()
                        }}
                        accessibilityLabel="Cancelar reservación"
                        disabled={disableButton}
                        style={[styles.cancelButton, { width: '80%' }]}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>

                </View>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    
    leftContainer: {
        alignItems: 'flex-start'
    },
    
    rightContainer: {
        alignItems: 'flex-end'
    }, 
    
    icon: {
        marginRight: 5,
        marginTop: 2
    }, 
    
    item: {
        paddingBottom: 5,
        marginVertical: 5,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 2,
    },

    buttonContainer: {
        alignItems: 'center'
    },

    acceptButton: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#4DD091'
    },

    cancelButton: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#FC6238'
    },

    buttonText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff"
    }
});
