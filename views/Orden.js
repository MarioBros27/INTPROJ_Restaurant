import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
export default function Orden({ route, navigation, id }) {
    const { item } = route.params;

    let time = new Date(item.createdAt)
    const appSettings = require('../app-settings.json');

    const cancelAlert = () => {
        Alert.alert('', '¿De verdad quieres cancelar la orden?', [
            { text: 'Aceptar', onPress: () => setStatus("cancelado") },
            {
                text: 'Cancelar',
                style: 'cancel',
            },

        ]);
    }

    const setStatus = (status) => {
        axios.put(`${appSettings['backend-host']}/itemBills/${item.ItemBill.id}`,
            {
                status: status
            }
        ).then((response) => { navigation.pop() })
            .catch((error) => { alert(`There was an error updating the error. Error details: ${error}`) })
    }
    return (

        <View style={styles.parentContainer}>

            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>Descripcion: {item.description}</Text>
            <Text style={styles.subtitle}>Cantidad: {item.ItemBill.quantity}</Text>
            <Text style={styles.subtitle}>Estado: {item.ItemBill.status}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("pendiente")
                    }}
                    title="Marcar como pendiente"
                    color="#8cd3ff"
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("atendido")
                    }}
                    title="Marcar como atendido"
                    color="#59bfff"
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("entregado")
                    }}
                    title="Marcar como entregado"
                    color="#26abff"
                />

            </View>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        cancelAlert()
                    }}
                    title="Marcar como cancelado"
                    color="#009dff"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
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
        fontSize: 32,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 18
    }

});
