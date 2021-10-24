import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ClientNew({ navigation }) {
    const [name, setName] = React.useState("Escanea cliente")
    const [id, setID] = React.useState("")
    const [table, setTable] = React.useState("")
    const [hasPermission, setHasPermission] = React.useState(null);
    // const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
        setName(data)
        setID(data)
        // console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

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
                        alert("Check In")
                    }}
                    title="Check In"
                    color="green"
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
    qrScanner:{
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
