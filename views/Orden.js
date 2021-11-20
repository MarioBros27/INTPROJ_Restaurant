import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
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
        <>
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{item.ItemBill.quantity} {item.name}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        { item.ItemBill.status == "pendiente" &&
                            <Text style={styles.pendingOrder}>Pendiente</Text>
                        }
                        { item.ItemBill.status == "cancelado" &&
                            <Text style={styles.cancelledOrder}>Cancelado</Text>
                        }
                        { item.ItemBill.status == "entregado" &&
                            <Text style={styles.deliveredOrder}>Entregado</Text>
                        }
                        { item.ItemBill.status == "atendido" && 
                            <Text style={styles.attendedOrder}>Atendido</Text>
                        }
                    </View>
                </View>
                <Text style={styles.subtitle}>{item.description}</Text>
            </View>

            <View style={[styles.rowContainer, {marginHorizontal: 10, marginBottom: 10}]}>
                <View style={[styles.leftContainer, {width: '50%'}]}>
                    <Pressable
                        onPress={() => {
                            setStatus("pendiente")
                        }}
                        style={styles.pendingButton}
                    >
                        <Text style={[styles.buttonText, { color: '#FCD423' }]}>¡Pendiente!</Text>
                    </Pressable>
                </View>

                <View style={[styles.rightContainer, {width: '50%'}]}>
                    <Pressable
                        onPress={() => {
                            setStatus("atendido")
                        }}
                        style={styles.attendedButton}
                    >
                        <Text style={[styles.buttonText, { color: '#B77AEC' }]}>¡Atendido!</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[styles.rowContainer, {marginHorizontal: 10}]}>
                <View style={[styles.leftContainer, {width: '50%'}]}>
                    <Pressable
                        onPress={() => {
                            cancelAlert()
                        }}
                        style={styles.cancelButton}
                    >
                        <Text style={[styles.buttonText, { color: '#FE7282' }]}>¡Cancelado!</Text>
                    </Pressable>
                </View>

                <View style={[styles.rightContainer, {width: '50%'}]}>
                    <Pressable
                        onPress={() => {
                            setStatus("entregado")
                        }}
                        style={styles.deliveredButton}
                    >
                        <Text style={[styles.buttonText, { color: '#8CC6AE' }]}>¡Entregado!</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: '#00b4d8',
        borderLeftWidth: 3,
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 16,
        borderRadius: 10
    },

    pendingOrder: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#F8E473",
        color: "#C49102"
    },

    cancelledOrder: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#FBA490",
        color: "#B83253"
    },

    deliveredOrder: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#9DD7BF",
        color: "#315e26"
    },

    attendedOrder: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#C69FE9",
        color: "#6F22B3"
    },

    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 14
    },

    pendingButton: {
        paddingHorizontal: 8,
        width: '97%',
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: '#FCD423'
    },

    cancelButton: {
        paddingHorizontal: 8,
        width: '97%',
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#FE7282"
    },

    attendedButton: {
        paddingHorizontal: 8,
        width: '97%',
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#B77AEC"
    },

    deliveredButton: {
        paddingHorizontal: 8,
        width: '97%',
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: '#8CC6AE'
    },

    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#fff" 
    },
    
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3
    },

    leftContainer: {
        alignItems: 'flex-start'
    },

    rightContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    }, 
});
