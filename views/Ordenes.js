import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';
const DATA = [

    {
        title: "Pendientes:",
        data: [{
            id: "1",
            status: "pendiente",
            cliente: "Marco Bonilla Ruiz",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "14:30"
        },
        {
            id: "2",
            status: "pendiente",
            cliente: "Leandro Genaro",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "13:30"
        },
    ]
    },
    {
        title: "Atendidos:",
        data: [{
            id: "3",
            status: "atendido",
            cliente: "Paco LOL",
            mesa: "2",
            item: "Chilaquiles verdes",
            hora: "14:30"
        },
        {
            id: "4",
            status: "atendido",
            cliente: "Loneaardoa Sanchez",
            mesa: "1",
            item: "Chilaquiles rojos",
            hora: "13:30"
        },]
    },
    {
        title: "Entregados:",
        data: [{
            id: "5",
            status: "entregado",
            cliente: "Marco Bonilla Ruiz",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "14:30"
        },
        {
            id: "6",
            status: "entregado",
            cliente: "Leandro Genaro",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "13:30"
        },]
    }
    ,
    {
        title: "Cancelados:",
        data: [{
            id: "7",
            status: "cancelado",
            cliente: "Marco Bonilla Ruiz",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "14:30"
        },
        {
            id: "8",
            status: "cancelado",
            cliente: "Leandro Genaro",
            mesa: "4",
            item: "Chilaquiles rojos",
            hora: "13:30"
        },]
    }

]


export default function Ordenes({ navigation }) {
    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("Orden", {
                item: item
            })
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.item}</Text>
                <Text style={styles.subtitle}>#Mesa: {item.mesa}</Text>
                <Text style={styles.subtitle}>{item.cliente}</Text>
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
                        alert("actualizando")
                    }}
                    title="Actualizar"
                    color="green"
                    accessibilityLabel="Actualizar"
                />
            </View>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={renderItem }
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
    subtite: {
        fontSize: 12
    }

});
