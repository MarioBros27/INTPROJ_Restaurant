import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity, SectionList } from 'react-native';
const DATA = [

    {
        title: "Pendientes:",
        data: [{
            id: "1",
            status: "pendiente",
            nombre: "Marco Bonilla Ruiz",
            personas: "4",
            fecha: "12-12-2021",
            hora: "14:30"
        },
        {
            id: "2",
            status: "pendiente",
            nombre: "Marco Lucio Ruiz",
            personas: "2",
            fecha: "12-12-2021",
            hora: "14:30"
        }]
    },
    {
        title: "Aceptados:",
        data: [{
            id: "1",
            status: "aceptado",
            nombre: "Marco Bonilla Ruiz",
            personas: "4",
            fecha: "12-12-2021",
            hora: "14:30"
        },
        {
            id: "2",
            status: "aceptado",
            nombre: "Marco Lucio Ruiz",
            personas: "2",
            fecha: "12-12-2021",
            hora: "14:30"
        },
        {
            id: "3",
            status: "aceptado",
            nombre: "Manuela Molcas",
            personas: "4",
            fecha: "12-12-2021",
            hora: "14:30"
        },]
    }

]


export default function Pagos({ navigation }) {
    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("Reservacion", {
                item: item
            })
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>#Personas: {item.personas}</Text>
                <Text style={styles.subtitle}>{item.fecha}</Text>
                <Text style={styles.subtitle}>{item.hora}</Text>
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
