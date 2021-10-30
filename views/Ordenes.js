import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';
import axios from 'axios';



export default function Ordenes({ navigation, id }) {
    const [data, setData] = React.useState([])
    const appSettings = require('../app-settings.json');

    const dateAcceptable = function (firstDate, secondDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        return false;
    };
    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/itemBills/byRestaurant?restaurantId=${id}`
        )
            .then(response => {
                const today = new Date();
                let cleanOrders = [{
                    title: "Pendientes:",
                    data: []
                },
                {
                    title: "Atendidos:",
                    data: []
                },
                {
                    title: "Entregados:",
                    data: []
                },
                {
                    title: "Cancelados:",
                    data: []
                }]
                response['data'].forEach((ele) => {
                    const date = new Date(ele["createdAt"])
                    if (dateAcceptable(today, date)) {
                        if (!ele["Bill"]["done"]) {
                            if (ele["status"] == "pendiente") {
                                cleanOrders[0].data.push(ele)

                            } else if (ele["status"] == "atendido") {
                                cleanOrders[1].data.push(ele)
                            } else if (ele["status"] == "entregado") {
                                cleanOrders[2].data.push(ele)
                            } else if (ele["status"] == "cancelado") {
                                cleanOrders[3].data.push(ele)
                            }
                        }
                    }
                })
                setData(cleanOrders)
            })
            .catch(error => {
                // console.log(error)
                alert(`There was an error fetching the reservations. Error details: ${error}`)
            })
    }
    React.useEffect(() => {
        fetchData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [])
    const Item = ({ item }) => {

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("Orden", {
                    item: item
                })
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{item["Bill"]["Items"][0]["name"]}</Text>
                    <Text style={styles.subtitle}>#Mesa: {item["Bill"]["tableNumber"]}</Text>
                    <Text style={styles.subtitle}>{item["Bill"]["Customer"]["firstName"]} {item["Bill"]["Customer"]["lastName"]}</Text>
                </View>
            </TouchableOpacity>

        );
    }
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        fetchData()
                    }}
                    title="Actualizar"
                    color="green"
                    accessibilityLabel="Actualizar"
                />
            </View>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: StatusBar.currentHeight || 0,
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
    header: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold",
        marginLeft: 20
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
