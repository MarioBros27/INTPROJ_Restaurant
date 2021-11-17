import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';

export default function Clientes({ navigation, id }) {

    const [data, setData] = React.useState([])
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
    React.useEffect(() => {
        fetchData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [])
    const Item = ({ item }) => {
        let time = new Date(item.checkIn)
        let hours = time.getHours()
        let minutes = time.getMinutes()

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
            </TouchableOpacity>
        )
    };

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        navigation.navigate("ClientNew")
                    }}
                    style={styles.addButton}
                >
                    <Text style={styles.textButton}>Crear orden virtual</Text>
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
        alignItems: 'flex-end',
        marginRight: 15
    },

    item: {
        borderRadius: 10,
        borderLeftWidth: 2,
        borderLeftColor: "#FC6238",
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
    },

    buttonContainer: {
        alignItems: 'flex-end',
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
