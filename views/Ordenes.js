import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function Ordenes({ navigation, id }) {
    const [data, setData] = React.useState([])
    const [ refresh, setRefresh ] = useState(false);
    const appSettings = require('../app-settings.json');

    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/bills?restaurantId=${id}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(`There was an error fetching the reservations. Error details: ${error}`)
            })
    }
    useEffect(() => {
        fetchData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [refresh])


    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const renderItemBill = ({ item }) => {

        return (
            <>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.subtitle}>{`${item.ItemBill.quantity} ${item.name}`}</Text>
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
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Orden", {
                            item: item
                        })
                    }}>
                        <View style={styles.detailsContainer}>
                            
                            <Text style={styles.detailsText}>Actualizar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    };

    const Item = ({ item }) => {
        return (
            <>
                <View style={styles.item}>
                    <Text style={styles.title}>{item.Customer.firstName + " " + item.Customer.lastName} - Mesa {item.tableNumber}</Text>
                    <FlatList
                        data={item.Items}
                        renderItem={renderItemBill}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.breakLine}>

                </View>
            </>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
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
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: '#00b4d8',
        borderLeftWidth: 3,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10
    },

    pendingOrder: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        marginBottom: 3,
        borderRadius: 5,
        backgroundColor: "#F8E473",
        color: "#C49102"
    },

    cancelledOrder: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        marginBottom: 3,
        borderRadius: 5,
        backgroundColor: "#FBA490",
        color: "#B83253"
    },

    deliveredOrder: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        marginBottom: 3,
        borderRadius: 5,
        backgroundColor: "#8DD7BF",
        color: "#315e26"
    },

    attendedOrder: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        marginBottom: 3,
        borderRadius: 5,
        backgroundColor: "#C69FE9",
        color: "#6F22B3"
    },

    breakLine: {
        marginVertical: 3,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        marginHorizontal: 8
    },

    title: {
        fontSize: 18,
        marginBottom: 10,
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

    titleContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row'
    },

    detailsContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    },

    detailsText: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        borderColor: '#00b4d8',
        borderWidth: 1,
        color: '#00b4d8'
    }

});
