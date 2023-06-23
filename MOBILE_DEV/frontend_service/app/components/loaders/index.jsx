import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { BLUE } from '../../config/colors';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={BLUE} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Spinner;

