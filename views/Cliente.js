import React from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';

export default function Cliente({ route, navigation }) {
    const { item } = route.params;
    return (

        <View style={styles.parentContainer}>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.nombre}</Text>
                <Text style={styles.subtitle}>#Mesa: {item.mesa}</Text>
                <Text style={styles.subtitle}>Total: {item.total}</Text>
                <Text style={styles.subtitle}>{item.hora}</Text>
                <Text style={styles.subtitleBold}>Pagado? Sí</Text>

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        navigation.navigate("CodeForClient",{
                            id:item.id
                        })
                    }}
                    title="Ver Codigo"
                    color="black"
                />
                
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        alert("Pendiente")
                    }}
                    title="Terminado"
                    color="blue"
                />
                
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    infoContainer: {
        flexDirection: "column",
        padding: 0
    },
    buttonContainer: {
        marginTop: 40
    },
    title: {
        fontSize: 40,
        marginBottom: 2,
        fontWeight: "bold"
    },
    subtite: {
        fontSize: 27
    },
    subtitleBold: {
        fontSize: 32,
        fontWeight: "bold"

    }

});
