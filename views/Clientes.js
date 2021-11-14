import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Clientes({ navigation, id }) {

    const [data, setData] = React.useState([])
    const appSettings = require('../app-settings.json');


    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/bills?restaurantId=${id}`
        )
            .then(response => {
                let cleanData = []
                response.data.forEach(element => {
                    if (!element.done) {
                        cleanData.push(element)
                    }
                });

                setData(cleanData)
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
                    <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                    <Text style={styles.subtitle}>#Mesa: {item.tableNumber}</Text>
                    <Text style={styles.subtitle}>{
                        `${hours}:${minutes}`
                    }</Text>
                    <Text style={styles.subtitle}>Total: ${item.total}</Text>
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
                <Button
                    onPress={() => {
                        navigation.navigate("ClientNew")
                    }}
                    title="Check In"
                    color="#fc6c27"
                />
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
        flex: 1
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginBottom: 4
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 14
    }

});
