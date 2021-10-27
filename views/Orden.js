import React from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';

export default function Orden({ route, navigation }) {
    const { item } = route.params;
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.item}</Text>
                <Text style={styles.subtitle}>#Mesa: {item.mesa}</Text>
                <Text style={styles.subtitle}>{item.cliente}</Text>
                <Text style={styles.subtitle}>{item.hora}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Pendiente")
                    }}
                    title="Pendiente"
                    color="blue"
                />
                
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Atendido")
                    }}
                    title="Atendido"
                    color="orange"
                />
                
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Entregado")
                    }}
                    title="Entregado"
                    color="green"
                />
                
            </View>
            
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("cancelando")
                    }}
                    title="Cancelar orden"
                    color="red"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        flexDirection: "column",
        padding: 20
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 22
    },
    buttonContainer: {
        marginTop: 25
    },
    title: {
        fontSize: 32,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 18
    }

});
