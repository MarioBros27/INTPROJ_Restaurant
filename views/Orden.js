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
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    infoContainer: {
        flexDirection: "column",
        padding: 0
    },
    buttonContainer: {
        marginTop: 25
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 12
    }

});
