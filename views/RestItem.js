import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import axios
    from 'axios';
export default function RestItem({ route, navigation, id }) {
    const { item } = route.params;

    const [name, setName] = React.useState("")
    // const [brand, setBrand] = React.useState("")
    // const [type, setType] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [desc, setDesc] = React.useState("")
    const [disableButton, setDisableButton] = React.useState(false)
    const appSettings = require('../app-settings.json');

    React.useEffect(() => {
        if (item) {
            setName(item.name)
            setPrice(String(item.price))
            setDesc(item.description)
        }
    }, [])
    const submitChanges = () => {
        if (name.length == 0 || price.length == 0) {
            alert("Error: has dejado vacio campos importantes")
            return;
        }
        setDisableButton(true)
        if (item) {//If we are updating an item
            axios.put(`${appSettings['backend-host']}/restaurants/${id}/items/${item.id}`, {
                name: name,
                description: desc,
                price: price,
                type: "mvp"
            })
                .then(response => {
                    setDisableButton(false)
                    alert("cambios guardados")
                })
                .catch(error => {
                    setDisableButton(false)
                    alert(`There was an error updating the item. Error details: ${error}`)
                })
        } else {//If we are posting a new item
            axios.post(`${appSettings['backend-host']}/restaurants/${id}/items/`, {
                name: name,
                description: desc,
                price: price,
                type: "mvp"
            })
                .then(response => {
                    setDisableButton(false)
                    navigation.pop()
                })
                .catch(error => {
                    setDisableButton(false)
                    alert(`There was an error creating the item. Error details: ${error}`)
                })
        }
    }
    const deleteItem = ()=>{

    }
    return (

        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Nombre del producto</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />
                <Text style={styles.label}>Precio</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                />
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.longInput}
                    onChangeText={setDesc}
                    value={desc}
                />


                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => {
                            submitChanges()
                        }}
                        disabled={disableButton}
                        style={styles.saveButton}
                    >
                        <Text
                            style={styles.textButton}
                        >Guardar cambios</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    label: {
        marginBottom: 12,
        fontWeight: "bold",
        color: "#000",
        borderLeftColor: "#8DD7BF"
    },

    input: {
        width: "100%",
        marginBottom: 20,
        borderBottomColor: "#dedede",
        borderBottomWidth: 2,
        borderRadius: 10,
        padding: 10,
        color: "#666",
        backgroundColor: "#fff"
    },

    longInput: {
        width: "100%",
        marginBottom: 12,
        borderBottomColor: "#dedede",
        borderBottomWidth: 2,
        borderRadius: 10,
        padding: 10,
        color: "#666",
        backgroundColor: "#fff"
    },

    buttonContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveButton: {
        marginTop: 10,
        backgroundColor: "#C05780",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50
    },

    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff" 
    }

});
