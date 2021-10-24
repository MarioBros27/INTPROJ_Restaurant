import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function ClientNew({ navigation }) {
    const [name, setName] = React.useState("")
    const [id, setID] = React.useState("")


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ricardo Luna</Text>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Escanear")
                    }}
                    title="Escanear cliente"
                    color="#fc6c27"
                />

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Check In")
                    }}
                    title="Check In"
                    color="green"
                />

            </View>

        </View>
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontWeight: "bold"
    },
    buttonContainer: {
        marginTop: 50
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
