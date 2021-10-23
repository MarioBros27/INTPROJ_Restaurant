import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';

export default function RestBank({ navigation }) {
    const [clabe, setClabe] = React.useState("")

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>CLABE Interbancaria</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setClabe}
                    value={clabe}
                />
                <Button
                    onPress={() => {

                    }}
                    title="Guardar cambios"
                    color="green"
                    accessibilityLabel="Guardar cambios"
                />
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
    input: {
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#fff"
    }

});
