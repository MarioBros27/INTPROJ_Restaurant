import React from 'react';
import { StyleSheet, View, Button, TextInput, Image, ScrollView,Text } from 'react-native';
import logo from '../assets/logo.png'
import { AuthContext } from '../context'
import Loading from './Loading';
import axios from 'axios'


export default function LogIn({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("")

    const [name, setName] = React.useState("")
    const [street, setStreet] = React.useState("")
    const [numExt, setNumExt] = React.useState("")
    const [numInt, setNumInt] = React.useState("")
    const [colonia, setColonia] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [phone1, setPhone1] = React.useState("")
    const [phone2, setPhone2] = React.useState("")

    const { logIn } = React.useContext(AuthContext);
    const handleSignUp = () => {
        if (password != password2) {
            alert("contraseñas no coinciden")
            return
        }
        if (password.length < 6) {
            alert("contraseña corta. Por lo menos 6 caracteres")
        }
        setLoading(true)
        const params = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGB-OZeGVtIXJfmD1HYeJ1s9vUNEj18Tc", params)
            .then(function (response) {
                console.log(response.data.localId)
                let token = response.data['localId']
                logIn(token)
            })
            .catch(function (error) {
                setLoading(false)
                if (error.response.data) {
                    let code = error.response.data.error.errors[0].message
                    console.log(code)
                    if (code == "EMAIL_EXISTS") {
                        alert("Ya existe este correo, use otro")
                    } else if (code == "TOO_MANY_ATTEMPTS_TRY_LATER") {
                        alert("Intentó muchas veces, pruebe más tarde")
                    } else if (code == "INVALID_EMAIL") {
                        alert("Correo invalido")
                    } else {
                        alert("Error, intente de nuevo")
                    }
                } else {
                    alert("Error, intente de nuevo")
                }

            })

    }
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <Image style={styles.stretch} source={logo} /> */}
                <Text style={styles.label}>Nombre del restaurante</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
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
                <Text style={styles.label}>Datos de acceso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword2}
                    value={password2}
                    placeholder="Confirma contraseña"
                    secureTextEntry={true}
                />
                <View style={styles.buttonCreate}>
                    <Button
                        onPress={() => handleSignUp()}
                        title="Crear"
                        color="#fc6c27"
                        accessibilityLabel="Crear"
                    />
                </View>

            </View>
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
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    buttonCreate: {
        width: "60%",
        marginTop: 20
    },
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    },

});
