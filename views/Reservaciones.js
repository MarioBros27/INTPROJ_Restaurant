import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button, TouchableOpacity, SectionList } from 'react-native';

import axios from 'axios';


export default function Reservaciones({ navigation, id }) {
    const [data, setData] = React.useState([])
    const appSettings = require('../app-settings.json');

    const dateAcceptable = function (firstDate, secondDate) {
        if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        return false;
    };
    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/reservations?restaurantId=${id}`
        )
            .then(response => {
                const today = new Date();
                let cleanAppointments = [{
                    title: "Pendientes:",
                    data: []
                },
                {
                    title: "Aceptados:",
                    data: []
                },
                {
                    title: "Cancelados:",
                    data: []
                }]
                response['data'].forEach((ele) => {
                    const date = new Date(ele["appointment"])
                    if (dateAcceptable(today, date)) {
                        if (ele["status"] == "waiting") {
                            cleanAppointments[0]["data"].push(ele)
                        } else if (ele["status"] == "accepted") {
                            cleanAppointments[1]["data"].push(ele)
                        } else {
                            cleanAppointments[2]["data"].push(ele)
                        }
                    }
                })
                setData(cleanAppointments)
            })
            .catch(error => {
                alert(`There was an error fetching the reservations. Error details: ${error}`)
            })
    }
    React.useEffect(() => {
        fetchData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
    }, [])
    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("Reservacion", {
                item: item
            })
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                <Text style={styles.subtitle}>#Personas: {item.seats}</Text>
                <Text style={styles.subtitle}>{item.appointment.substr(0, 10)}</Text>
                <Text style={styles.subtitle}>{item.appointment.substr(11, 5)}</Text>
            </View>
        </TouchableOpacity>

    );

    const renderItem = ({ item }) => {
        return (
            <Item item={item} />
        );
    }
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
        fontSize: 16
    }

});
