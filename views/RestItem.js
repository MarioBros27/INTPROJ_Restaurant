import React from 'react';
import { StyleSheet, View, Text, ScrollView, Button, TextInput } from 'react-native';

export default function RestMenu({ route, navigation }) {
    const { item } = route.params;
    // const [name, setName] = React.useState(item.nombre)
    // // const [brand, setBrand] = React.useState("")
    // // const [type, setType] = React.useState("")
    // const [price, setPrice] = React.useState(item.precio)
    // const [desc, setDesc] = React.useState(item.descripcion)

    const [name, setName] = React.useState("")
    // const [brand, setBrand] = React.useState("")
    // const [type, setType] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [desc, setDesc] = React.useState("")
    React.useEffect(() => {
        if (item) {
            setName(item.nombre)
            setPrice(item.precio)
            setDesc(item.descripcion)
        }
    }, [])

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
                    numberOfLines={6}
                    style={styles.longInput}
                    onChangeText={setDesc}
                    value={desc}
                />


                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            alert("producto guardado")
                        }}
                        title="Guardar cambios"
                        color="green"
                        accessibilityLabel="Guardar cambios"
                    />
                </View>
                <Button
                    onPress={() => {
                        alert("seguro borrar?")
                    }}
                    title="Borrar producto"
                    color="red"
                    accessibilityLabel="Borrar producto"
                />
            </View>
        </ScrollView>

    );
}

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
    buttonContainer: {
        marginBottom: 20
    }

});
