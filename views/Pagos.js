import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

export default function Pagos({ navigation, id }) {

    const [data, setData] = useState([])
    const [ refresh, setRefresh ] = useState(false);
    const appSettings = require('../app-settings.json');


    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/bills?restaurantId=${id}`
        )
            .then(response => {
                let cleanData = []
                response.data.forEach(element => {
                    if (element.paid) {
                        cleanData.push(element)
                    }
                });

                setData(cleanData)
            })
            .catch(error => {
                alert(`There was an error fetching the payments. Error details: ${error}`)
            })
    }
    useEffect(() => {
        fetchData()
    }, [refresh])
    const Item = ({ item }) => {
        let time = new Date(item.paymentTime)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let day = time.getDay()
        let month = time.getMonth() +1
        let year = time.getFullYear()

        return (
            <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={[styles.leftContainer, { width: '70%' }]}>
                        <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                        <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Número de mesa: </Text>{item.tableNumber}</Text>
                        <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Fecha y hora: </Text>{new Date(Date.parse(item.paymentTime)).toString().slice(4,21)}</Text>
                        <Text style={styles.subtitle}><Text style={{ fontWeight: 'bold' }}>Referencia: </Text>{item.paymentReference}</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.total}>${item.total}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
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

    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderLeftColor: '#a254eb',
        borderLeftWidth: 3,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10
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

    leftContainer: {
        alignItems: 'flex-start',
    },

    rightContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#5e06aa"
    },
});
