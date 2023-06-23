/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from "react-native-paper";
import { GRAY, BLUE, BLACK } from "../../config/colors";

export default function ButtonText({ mode, style, disabled = false, ...props }) {
    return (
        <PaperButton
            style={[
                styles.button,
                { backgroundColor: disabled ? GRAY : BLUE },
                style,
            ]}
            disabled={disabled}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 4,
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 17,
        color: BLACK,
    },
});
