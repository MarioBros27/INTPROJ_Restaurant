import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity } from 'react-native';
const pagos = [
    {
        id: "1",
        nombre: "Mario Ruiz",
        mesa: "1",
        hora: "12:20",
        total: "420"
    },
    {
        id: "2",
        nombre: "Mario Sangre Lopez",
        hora: "12:20",
        mesa: "2",
        total: "0"
    },
    {
        id: "3",
        nombre: "Mario Lupo Marzo",
        hora: "12:20",
        mesa: "1",
        total: "920"
    },
    {
        id: "4",
        nombre: "Mario Mañana Viene Santa",
        hora: "12:20",
        mesa: "99",
        total: "420"
    },
]



export default function Pagos({ navigation }) {
    const Item = ({ item }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate("Cliente",{
            item: item
        })}}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>#Mesa: {item.mesa}</Text>
                <Text style={styles.subtitle}>{item.hora}</Text>
                <Text style={styles.subtitle}>Total: ${item.total}</Text>
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
                        navigation.navigate("ClientNew")
                    }}
                    title="Check In"
                    color="#fc6c27"
                />
            </View>
            <FlatList
                data={pagos}
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
