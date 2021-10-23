import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity } from 'react-native';
const items = [
    {
        id: "0",
        nombre: "hola",
        precio: "25",
        descripcion: "sahfiashiasjbfhdakjhkjash"
    },
    {
        id: "1",
        nombre: "hola",
        precio: "25",
        descripcion: "sahfiashiasjbfhdakjhkjash"
    },
    {
        id: "2",
        nombre: "hola",
        precio: "25",
        descripcion: "sahfiashiasjbfhdakjhkjash"
    },
    {
        id: "3",
        nombre: "hola",
        precio: "25",
        descripcion: "sahfiashiasjbfhdakjhkjash"
    }
]




export default function RestMenu({ navigation }) {
    const Item = ({ item }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate("Item",{
            item:item
        })}}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>${item.precio}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        navigation.navigate("Item",{
                            item:null
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
    subtite: {
        fontSize: 12
    }

});
