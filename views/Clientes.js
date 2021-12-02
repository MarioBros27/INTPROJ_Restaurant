import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function Clientes({ navigation, id }) {

    const [data, setData] = useState([])
    const [ refresh, setRefresh ] = useState([]);
    const appSettings = require('../app-settings.json');


    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/bills?restaurantId=${id}`
        )
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(`There was an error fetching the clients. Error details: ${error}`)
            })
    }
    useEffect(() => {
        fetchData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [refresh])
    const Item = ({ item }) => {
        let realDate = new Date(Date.parse(item.checkIn)).toString();

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("Cliente", {
                    item: item
                })
            }}>
                <View style={styles.item}>
                    <View style={styles.rowContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                            <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Número de mesa: </Text>{item.tableNumber}</Text>
                            <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Fecha de apertura: </Text>{realDate.slice(4, 15) }</Text>
                            <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Hora de apertura: </Text>{realDate.slice(16,24)}</Text>
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
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'flex-end'}}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("ClientNew")
                        }}
                        style={styles.addButton}
                    >
                        <Text style={styles.textButton}>Crear orden virtual</Text>
                    </Pressable>
                    <Pressable
                        style={{ marginBottom: 10, marginRight: 10, padding: 10, backgroundColor: '#00b0ba', borderRadius: 100}}
                        onPress={() => setRefresh(!refresh)}
                    >
                        <MaterialIcons style={{color: '#fff'}} name="refresh" color={"#00CDAC"} size={20} />
                    </Pressable>
                </View>
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
    container: {
        flex: 1,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    nameContainer: {
        alignItems: 'flex-start'
    },

    totalContainer: {
        alignItems: 'flex-end'
    },

    item: {
        borderRadius: 10,
        borderLeftWidth: 2,
        borderLeftColor: "#FC6238",
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    addButton: {
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
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
    }
});
