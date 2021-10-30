import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import axios from 'axios';
export default function Cliente({ route, navigation }) {
    const { item } = route.params;
    const appSettings = require('../app-settings.json');
    const [disableButton, setDisableButton] = React.useState(false)

    let pagado = ""
    if (item.paid) {
        pagado = "Sí"
    } else {
        pagado = "No"
    }
    let time = new Date(item.checkIn)
    let hours = time.getHours()
    let minutes = time.getMinutes()

    const handleDone = () => {
        setDisableButton(true)
        axios.put(`${appSettings['backend-host']}/bills/${item.id}`,
            {
                done: true
            })

            .then(response => {
                navigation.pop()
            })
            .catch(error => {
                setDisableButton(false)
                alert(`There was an error updating the status of the bill. Error details: ${error}`)
            })
    }
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{`${item["Customer"]["firstName"]} ${item["Customer"]["lastName"]}`}</Text>
                <Text style={styles.subtitle}>#Mesa: {item.tableNumber}</Text>
                <Text style={styles.subtitle}>Total: {item.total}</Text>
                <Text style={styles.subtitle}>Check-in: {hours}:{minutes}</Text>
                <Text style={styles.subtitleBold}>Pagado? {pagado}</Text>

            </View>

            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        handleDone()
                    }}
                    title="Terminado"
                    color="red"
                    disabled={disableButton}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        // flex: 1,
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
        marginTop: 40
    },
    title: {
        fontSize: 40,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 22
    },
    subtitleBold: {
        fontSize: 32,
        fontWeight: "bold"

    }

});
