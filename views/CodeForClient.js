import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';

export default function CodeForClient({ route, navigation }) {
    const { id } = route.params;

    return (


        <View style={styles.container}>


            <QRCode codeStyle='square' content={id} />
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    },
    stretch: {
        marginTop: '10%',
        marginBottom: '10%',
        width: 500,
        height: 500,
        resizeMode: 'contain'
    },

});
