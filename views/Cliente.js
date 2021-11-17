import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import axios from 'axios';
export default function Cliente({ route, navigation }) {
    const { item } = route.params;
    const appSettings = require('../app-settings.json');
    const [disableButton, setDisableButton] = React.useState(false)

    let pagado = ""
    if (item.paid) {
        pagado = "Sí"
    } else {
        pagado = "No"
    }
    let time = new Date(item.checkIn)
    let hours = time.getHours()
    let minutes = time.getMinutes()

    const handleDone = () => {
        setDisableButton(true)
        axios.put(`${appSettings['backend-host']}/bills/${item.id}`,
            {
                done: true
            })

            .then(response => {
                navigation.pop()
            })
            .catch(error => {
                setDisableButton(false)
                alert(`There was an error updating the status of the bill. Error details: ${error}`)
            })
    }
    const doneAlert = () => {
        Alert.alert('', '¿De verdad quieres sacar al cliente?', [
            { text: 'Aceptar', onPress: () => handleDone() },
            {
                text: 'Cancelar',
                style: 'cancel',
            },

        ]);
    }
    return (
        <>
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                        <Text style={styles.subtitle}>Número de mesa: {item.tableNumber}</Text>
                        <Text style={styles.subtitle}>Hora de apertura: {
                            `${hours}:${minutes}` 
                        }</Text>
                        <Text style={styles.subtitle}>Fecha de apertura: {item.checkIn.slice(0,10)}</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>${item.total}</Text>
                        { item.done && 
                            <Text style={styles.paidOrder}>Orden pagada</Text>
                        }
                        { !item.done &&
                            <Text style={styles.unpaidOrder}>Orden no pagada</Text>
                        }
                    </View>
                </View>
            </View>

            { !item.done && 
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            handleDone()
                        }}
                        style={styles.saveButton}
                        disabled={disableButton}
                    >
                        <Text style={styles.textButton}>Marcar orden como pagada</Text>
                    </Pressable>
                </View>
            }


            
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    nameContainer: {
        alignItems: 'flex-start'
    },

    totalContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    },

    item: {
        borderRadius: 10,
        borderLeftWidth: 2,
        borderLeftColor: "#FC6238",
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        marginHorizontal: 15,
    },

    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 14
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FC6238"
    },
    
    paidOrder: {
        padding: 5,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: "#8DD7BF",
        color: "#315e26"
    },

    unpaidOrder: {
        padding: 5,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: "#EFB3AB",
        color: "#B04632"
    },

    buttonContainer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveButton: {
        backgroundColor: "#FC6238",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50
    },

    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff"
    },
});
