import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
const pagos = [
    {
        id: "1",
        nombre: "Mario Ruiz",
        fecha: "12-12-2021",
        hora: "12:20",
        total: "24000",
        propina: "20",
        mesa: "1",
        referencia: "askjhkjh1-qsasaas-assaas-as"
    },
    {
        id: "2",
        nombre: "Mario Sangre Lopez",
        fecha: "12-12-2021",
        hora: "12:20",
        total: "24000",
        propina: "20",
        mesa: "2",
        referencia: "askjhkjh1-qsasaas-assaas-as"
    },
    {
        id: "3",
        nombre: "Mario Lupo Marzo",
        fecha: "12-12-2021",
        hora: "12:20",
        total: "24000",
        propina: "20",
        mesa: "1",
        referencia: "askjhkjh1-qsasaas-assaas-as"
    },
    {
        id: "4",
        nombre: "Mario Mañana Viene Santa",
        fecha: "12-12-2021",
        hora: "12:20",
        total: "24000",
        propina: "20",
        mesa: "99",
        referencia: "askjhkjh1-qsasaas-assaas-as"
    },
]



export default function Pagos({ navigation, id }) {

    const [data, setData] = React.useState([])
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
                // console.log(error)
                alert(`There was an error fetching the payments. Error details: ${error}`)
            })
    }
    React.useEffect(() => {
        fetchData()
        // const willFocusSubscription = navigation.addListener('focus', () => {
        //     fetchData();
        // });
    }, [])
    const Item = ({ item }) => {
        console.log(item)
        let time = new Date(item.paymentTime)
        let hours = time.getHours()
        let minutes = time.getMinutes()
        let day = time.getDay()
        let month = time.getMonth() +1
        let year = time.getFullYear()

        return (
            <View style={styles.item}>
                <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                <Text style={styles.subtitle}>Mesa: {item.tableNumber}</Text>
                <Text style={styles.subtitle}>Fecha de pago: {item.paymentTime.substr(0,10)}</Text>
                <Text style={styles.subtitle}>Hora de pago: {hours}:{minutes}</Text>
                <Text style={styles.subtitle}>Total: ${item.total}</Text>
                <Text style={styles.subtitle}>Propina: ${item.tip}</Text>
                <Text style={styles.subtitle}>Referencia: {item.paymentReference}</Text>
            </View>
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
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 14
    }

});
