import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';
import axios from 'axios';



export default function Ordenes({ navigation, id }) {
    const [data, setData] = React.useState([])
    const appSettings = require('../app-settings.json');

    React.useEffect(() => {
        axios.get(`${appSettings['backend-host']}/bills?restaurantId=${id}`)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(`There was an error fetching the reservations. Error details: ${error}`)
            })
    }, [])
    
    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    const renderItemBill = ({ item }) => {

        return(
            <TouchableOpacity onPress={() => {
                navigation.navigate("Orden", {
                    item: item
                })
            }}>
                <View style={styles.itemBill}>
                    <Text style={styles.title}>{ `${item.name} - ${item.ItemBill.quantity} (${item.ItemBill.status})`}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const Item = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.subtitle}>#Mesa: {item.tableNumber}</Text>
                <Text style={styles.subtitle}>{item.Customer.firstName + " " + item.Customer.lastName}</Text>
                <FlatList
                    data={item.Items}
                    renderItem={renderItemBill}
                    keyExtractor={item => item.id}
                />
                
            </View>
        );
    }
    
    return (

        <SafeAreaView style={styles.container}>
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
    itemBill: {
        padding: 5
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
