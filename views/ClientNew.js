import React from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
export default function ClientNew({ navigation, id }) {

    const [name, setName] = React.useState("Escanea el código QR del cliente")
    const [customerId, setCustomerId] = React.useState("")
    const [table, setTable] = React.useState("0")
    const [hasPermission, setHasPermission] = React.useState(null);
    const [fetched, setFetched] = React.useState(false)
    const appSettings = require('../app-settings.json');


    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    let fetching = false
    const handleBarCodeScanned = ({ type, data }) => {
        if (!fetching && !fetched) {
            fetching = true
            handleGet(data)
        }

    };

    const handleGet = (customersId) => {
        axios.get(`${appSettings['backend-host']}/customers/${customersId}`)
            .then(response => {
                setName(`${response.data.firstName} ${response.data.lastName} `)
                setFetched(true)
                setCustomerId(customersId)

            })
            .catch(error => {
                fetching = false
                setName("error, intentelo de nuevo")
            })
    }
    const handlePost = () => {
        let tableNumber = "0"
        if (table.length != 0) {
            tableNumber = table
        }

        axios.post(`${appSettings['backend-host']}/bills`, {
            checkIn: new Date(),
            total: 0,
            tip: 0,
            done: false,
            customerId: customerId,
            tableNumber: tableNumber,
            restaurantId: id,
            paid: false
        })
            .then(response => {
                navigation.pop()

            })
            .catch(error => {

                alert("error: intente todo de nuevo")
            })

    }

    if (hasPermission === false) {
        setName("NO tienes permiso para la camara")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={styles.qrScanner}
            />
            <View style={styles.rowContainer}>
                <Text style={styles.label}>Asigna un número de mesa</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTable}
                    placeholderTextColor={"#FFA23A"}
                    value={table}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        handlePost()
                    }}
                    style={styles.addButton}
                    disabled={!fetched}
                >
                    <Text style={styles.textButton}>Generar nueva orden virtual</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    label: {
        fontWeight: "bold"
    },
    buttonContainer: {
        alignItems: 'center'
    },
    qrScanner: {
        height: 200,
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 12
    },

    input: {
        width: "40%",
        margin: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffa23a',
        padding: 10,
        color: '#ffa23a',
        backgroundColor: "#fff"
    },
    addButton: {
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#FC6238",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50
    },

    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff",
        textAlign: 'center'
    },

});
