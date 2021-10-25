import React from 'react';
import { StyleSheet, View, Button, TextInput, Image, Text } from 'react-native';
import logo from '../assets/logo.png'
import { AuthContext } from '../context'
import Loading from './Loading';
import axios from 'axios'

export default function LogIn({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false)

    const { logIn } = React.useContext(AuthContext);

    const handleLogin = () => {
        setLoading(true)
        const params = {
            "email": email,
            "password": password,
            "returnSecureToken": true
        }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGB-OZeGVtIXJfmD1HYeJ1s9vUNEj18Tc",params)
        .then(function(response){
            let token = response.data['localId']
            console.log(token)
            logIn(token)
        })
        .catch(function(error){
            console.log("error :(", error)
            setLoading(false)
            if(error){
                let code = error.response.data.error.code
                if(code == 400){
                    alert("Error en usuario o contraseña")
                }else{
                    alert("Error, intentelo otra vez")
                }
            }
            
        })

    }

    if (loading) {
        return (<Loading />)
    } else {
        return (

            <View style={styles.container}>
                <Image style={styles.stretch} source={logo} />
                <Text style ={styles.title}>Restaurante</Text>
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
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View style={styles.buttonLogIn}>
                    <Button
                        onPress={() => { handleLogin()}}
                        title="Log In"
                        color="#fc6c27"
                        accessibilityLabel="Log In"
                    />
                </View>
                <View style={styles.buttonCreate}>
                    <Button
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                        title="Crear cuenta"
                        color="#000"
                        accessibilityLabel="Crear cuenta"
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        // fontFamily: "Menlo",
        fontSize: 20,
        fontWeight: "bold"
    },
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    buttonLogIn: {
        width: "60%",
        marginTop: 40
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
