import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';
export default function Orden({ route, navigation, id }) {
    const { item } = route.params;

    let time = new Date(item.createdAt)
    let hours = time.getHours()
    let minutes = time.getMinutes()
    const appSettings = require('../app-settings.json');


    const setStatus = (status)=>{
        axios.put(`${appSettings['backend-host']}/itemBills/${item.id}`,
        {
            status:status
        }
        ).then((response)=>{navigation.pop()})
        .catch((error)=>{alert(`There was an error updating the error. Error details: ${error}`)})
    }
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item["Bill"]["Items"][0]["name"]}</Text>
                <Text style={styles.subtitle}>#Mesa: {item["Bill"]["tableNumber"]}</Text>
                <Text style={styles.subtitle}>{item["Bill"]["Customer"]["firstName"]} {item["Bill"]["Customer"]["lastName"]}</Text>
                <Text style={styles.subtitle}>Pidió a las {hours}:{minutes}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("pendiente")
                    }}
                    title="Pendiente"
                    color="blue"
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("atendido")
                    }}
                    title="Atendido"
                    color="orange"
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("entregado")
                    }}
                    title="Entregado"
                    color="green"
                />

            </View>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        setStatus("cancelado")
                    }}
                    title="Cancelar orden"
                    color="red"
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
