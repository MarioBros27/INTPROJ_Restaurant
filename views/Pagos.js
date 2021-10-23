import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, StatusBar, Button, TouchableOpacity } from 'react-native';
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



export default function Pagos({ navigation }) {
    const Item = ({ item }) => (
        // <TouchableOpacity onPress={()=>{navigation.navigate("Pago",{
        //     pago: item
        // })}}>
        //     <View style={styles.item}>
        //         <Text style={styles.title}>{item.nombre}</Text>
        //         <Text style={styles.subtitle}>{item.fecha}</Text>
        //         <Text style={styles.subtitle}>{item.hora}</Text>
        //         <Text style={styles.subtitle}>Total: ${item.total}</Text>
        //         <Text style={styles.subtitle}>Propina: ${item.propina}</Text>
        //     </View>
        // </TouchableOpacity>
        <View style={styles.item}>
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.subtitle}>Mesa: {item.mesa}</Text>
            <Text style={styles.subtitle}>Fecha de pago: {item.fecha}</Text>
            <Text style={styles.subtitle}>Hora de pago: {item.hora}</Text>
            <Text style={styles.subtitle}>Total: ${item.total}</Text>
            <Text style={styles.subtitle}>Propina: ${item.propina}</Text>
            <Text style={styles.subtitle}>Referencia: ${item.referencia}</Text>
        </View>
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
    subtite: {
        fontSize: 12
    }

});
