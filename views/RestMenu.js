import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';

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
                alert(`There was an error fetching the Restaurant menu. Error details: ${error}`)
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
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subtitle}>{item.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.breakLine}>

            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (

        <View style={styles.container}>

            <View style={styles.buttonContainer}>

                <Pressable
                    onPress={() => {
                        navigation.navigate("Item", {
                            item: null
                        })
                    }}
                    style={styles.addButton}
                >
                    <Text
                        style={styles.textButton}
                    >Agregar objeto</Text>
                </Pressable>
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
    },

    buttonContainer: {
        alignItems: 'flex-end',
    },

    addButton: {
        marginRight: 20,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#C05780",
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

    item: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 15
    },

    breakLine: {
        marginVertical: 3,
        borderBottomColor: "#dedede",
        borderBottomWidth: 1,
        marginHorizontal: 8
    },

    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: 16
    },

    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#C05780"
    },
    
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    titleContainer: {
        alignItems: 'flex-start'
    },

    priceContainer: {
        alignItems: 'flex-end',
        marginRight: 15
    },
});
