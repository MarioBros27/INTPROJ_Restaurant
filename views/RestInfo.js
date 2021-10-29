import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios'
export default function RestInfo({ navigation,id }) {
    const [name, setName] = React.useState("")
    const [street, setStreet] = React.useState("")
    const [numExt, setNumExt] = React.useState("")
    const [numInt, setNumInt] = React.useState("")
    const [colonia, setColonia] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [phone1, setPhone1] = React.useState("")
    const [phone2, setPhone2] = React.useState("")
    const [desc, setDesc] = React.useState("")

    const [loaded,setLoaded] =React.useState(false)
    const [disableButton, setDisableButton] = React.useState(false)


    const appSettings = require('../app-settings.json');

    React.useEffect(()=>{
        axios.get(`${appSettings['backend-host']}/restaurants/${id}`
           )
            .then(response => {
                setName(response["data"]["name"])
                setStreet((response["data"]["street"]))
                setNumExt(response["data"]["externalNumber"])
                setNumInt(response["data"]["internalNumber"])
                setColonia(response["data"]["suburb"])
                setCity(response["data"]["city"])
                setState(response["data"]["state"])
                setPhone1(response["data"]["phone1"])
                setPhone2(response["data"]["phone2"])
                setDesc(response["data"]["description"])

                setLoaded(true)
            })
            .catch(error => {
                alert(`There was an error creating the restaurant. Error details: ${error}`)
            })
    },[])
    const submitChanges = ()=>{
        if (desc.length == 0|| name.length == 0 ||street.length == 0  || numExt.length == 0|| colonia.length == 0 ||city.length == 0  || state.length == 0) {
            alert("Error: has dejado vacio campos importantes")
            return;
        }
        setDisableButton(true)
        axios.put(`${appSettings['backend-host']}/restaurants/${id}`, {
            name: name,
            description: desc,
            street: street,
            externalNumber: numExt,
            internalNumber: numInt,
            suburb: colonia,
            state: state,
            city: city,
            phone1: phone1,
            phone2: phone2
        })
            .then(response => {
                setDisableButton(false)
                alert("cambios guardados")
            })
            .catch(error => {
                setDisableButton(false)
                alert(`There was an error creating the restaurant. Error details: ${error}`)
            })
    }
    return (
       
        <ScrollView>
             {loaded &&
            <View style={styles.container}>
                <Text style={styles.label}>Nombre del restaurante</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    multiline
                    numberOfLines={6}
                    style={styles.longInput}
                    onChangeText={setDesc}
                    value={desc}
                />
                <Text style={styles.label}>Calle</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setStreet}
                    value={street}
                />
                <Text style={styles.label}>Número exterior</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumExt}
                    value={numExt}
                />
                <Text style={styles.label}>Número interior</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumInt}
                    value={numInt}
                />
                <Text style={styles.label}>Colonia</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setColonia}
                    value={colonia}
                />
                <Text style={styles.label}>Ciudad</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCity}
                    value={city}
                />
                <Text style={styles.label}>Estado</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setState}
                    value={state}
                />
                <Text style={styles.label}>Teléfono 1</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone1}
                    value={phone1}
                />
                <Text style={styles.label}>Teléfono 2</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone2}
                    value={phone2}
                />
                <Button
                    onPress={() => {
                        submitChanges()
                    }}
                    title="Guardar cambios"
                    color="green"
                    accessibilityLabel="Guardar cambios"
                    disabled={disableButton}

                />
                
            </View>}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    label: {
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    longInput: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"

    },

});
