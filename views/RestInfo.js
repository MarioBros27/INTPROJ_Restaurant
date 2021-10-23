import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function RestInfo({navigation}) {
     return (

        <View style={styles.container}>
           
            <Text>Hello Template</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }

});
