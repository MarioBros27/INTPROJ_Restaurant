import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import expo from 'expo'
import axios from 'axios';
export default function ClientNew({ navigation, id }) {

    const [name, setName] = React.useState("Escanea cliente")
    const [customerId,setCustomerId] = React.useState("")
    const [table, setTable] = React.useState("0")
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
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
        if(!fetching && !fetched){
            fetching=true
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
                fetching =false
                setName("error, intentelo de nuevo")
            })
    }
    const handlePost = () =>{
        let tableNumber = "0"
        if(table.length !=0){
            tableNumber = table
        }

        axios.post(`${appSettings['backend-host']}/bills`,{
            checkIn: new Date(),
            total: 0,
            tip:0,
            done:false,
            customerId:customerId,
            tableNumber:tableNumber,
            restaurantId: id,
            paid:false
        })
            .then(response => {
                navigation.pop()

            })
            .catch(error => {
                
                alert("error: intente todo de nuevo")
            })

    }

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    // }
    if (hasPermission === false) {
        setName("NO tienes permiso para la camara")

    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={styles.qrScanner}
            />
            <Text style={styles.title}>{name}</Text>
            <View style={styles.rowContainer}>
                <Text style={styles.label}># Mesa</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTable}
                    value={table}
                    keyboardType="numeric"
                />
            </View>
            {/* <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        handle
                    }}
                    title={buttonTitle}
                    color="#fc6c27"
                />

            </View> */}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        handlePost()
                    }}
                    title="Check In"
                    color="green"
                    disabled={!fetched}

                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
    qrScanner: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 12
    },

    input: {
        width: "20%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    }

});
