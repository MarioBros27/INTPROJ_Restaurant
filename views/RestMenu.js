import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
// const items = [
//     {
//         id: "0",
//         nombre: "hola",
//         precio: "25",
//         descripcion: "sahfiashiasjbfhdakjhkjash"
//     },
//     {
//         id: "1",
//         nombre: "hola",
//         precio: "25",
//         descripcion: "sahfiashiasjbfhdakjhkjash"
//     },
//     {
//         id: "2",
//         nombre: "hola",
//         precio: "25",
//         descripcion: "sahfiashiasjbfhdakjhkjash"
//     },
//     {
//         id: "3",
//         nombre: "hola",
//         precio: "25",
//         descripcion: "sahfiashiasjbfhdakjhkjash"
//     }
// ]




export default function RestMenu({ navigation, id }) {

    const [items, setItems] = React.useState([])

    const appSettings = require('../app-settings.json');

    const fetchData = () => {
        axios.get(`${appSettings['backend-host']}/restaurants/${id}/items`
        )
            .then(response => {

                setItems(response["data"])
            })
            .catch(error => {
                alert(`There was an error creating the restaurant. Error details: ${error}`)
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
            navigation.navigate("Item", {
                item: item
            })
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (

        <View style={styles.container}>

            <View style={styles.buttonContainer}>

                <Button
                    onPress={() => {
                        navigation.navigate("Item", {
                            item: null
                        })
                    }}
                    title="Agregar al menú"
                    color="green"
                    accessibilityLabel="Agregar al menú"
                />
            </View>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>

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
        fontSize: 16
    }

});
