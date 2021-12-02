import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';


export default function Reservaciones({ navigation, id }) {
    const [data, setData] = useState([])
    const [ refresh, setRefresh ] = useState([]);
    const appSettings = require('../app-settings.json');

    const dateAcceptable = function (firstDate, secondDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        return false;
    };
    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/reservations?restaurantId=${id}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(`There was an error fetching the reservations. Error details: ${error}`)
            })
    }
    useEffect(() => {
        fetchData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [refresh])
    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("Reservacion", {
                item: item
            })
        }}>
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={[styles.leftContainer, {width: '60%'}]}>
                        <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>  
                    </View>
                    <View style={[styles.rightContainer, {width: '30%'}]}>
                        { item.status == 'waiting' && 
                            <Text style={styles.waitingReservation}>Pendiente</Text>
                        }
                        { item.status == 'canceled' && 
                            <Text style={styles.cancelledReservation}>Cancelada</Text>    
                        }
                        { item.status == 'accepted' &&
                            <Text style={styles.acceptedReservation}>Aceptada</Text>
                        }
                    </View>
                </View>
                <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Número de personas: </Text>{item.seats}</Text>
                <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Fecha y hora: </Text>{new Date(Date.parse(item.appointment)).toString().slice(4,21)}</Text>
            </View>
        </TouchableOpacity>

    );

    const renderItem = ({ item }) => {
        return (
            <Item item={item} />
        );
    }
    return (
        <SafeAreaView>
            <View style={{ marginTop: 15, marginRight: 15, alignItems: 'flex-end'}}>
                <Pressable
                    style={{ padding: 10, backgroundColor: '#00b0ba', borderRadius: 100}}
                    onPress={() => setRefresh(!refresh)}
                >
                    <MaterialIcons style={{color: '#fff'}} name="refresh" color={"#00CDAC"} size={20} />
                </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>

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
        marginHorizontal: 16,
        borderRadius: 10
    },

    waitingReservation: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#F8E473",
        color: "#C49102"
    },

    cancelledReservation: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#FBA490",
        color: "#B83253"
    },

    acceptedReservation: {
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
        backgroundColor: "#9DD7BF",
        color: "#315e26"
    },

    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 14
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
