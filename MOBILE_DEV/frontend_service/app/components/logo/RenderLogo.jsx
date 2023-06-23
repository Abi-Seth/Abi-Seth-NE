/* eslint-disable no-undef */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function RenderLogo() {
    return (
        <View style={{ marginBottom: 32, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../assets/EUCL.png')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        // width: 100,
        // height: 100,
    },
});