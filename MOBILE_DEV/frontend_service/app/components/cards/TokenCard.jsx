/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { BLUE, BLACK } from '../../config/colors';
import { Card, Paragraph } from "react-native-paper";

const TokenCard = ({ token }) => {
    const dateObj = new Date(token.purchased_date);

    const formattedDate = `${dateObj.toDateString()} ${dateObj.toLocaleTimeString()}`;

    return (
        <View style={tw`mb-[5%] w-[85]`}>
            <Card>
                <Card.Title
                    title={`${token.token}`}
                    subtitle={
                        <Text>
                            {`Purchased: ${formattedDate}`}
                        </Text>
                    }
                    titleStyle={[
                        styles.textBold,
                        tw`text-[${BLUE}] font-bold text-3xl opacity-80 py-5`,
                    ]}
                    subtitleStyle={tw`text-[${BLACK}] text-base`}
                />
                <Card.Content style={{ marginTop: 6 }}>
                    <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                        <Text style={{ fontWeight: 'bold' }}>Status</Text>
                        {` : ${token.token_status}`}
                    </Paragraph>
                    {token.tokenDescription && (
                        <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                            <Text style={{ fontWeight: 'bold' }}>Description</Text>
                            {` : ${token.tokenDescription}`}
                        </Paragraph>
                    )}
                    <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                        <Text style={{ fontWeight: 'bold' }}>Meter Number</Text>
                        {` : ${token.meter_number}`}
                    </Paragraph>
                    <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                        <Text style={{ fontWeight: 'bold' }}>Amount</Text>
                        {` : ${token.amount}`}
                    </Paragraph>
                    <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                        <Text style={{ fontWeight: 'bold' }}>Token Value Days</Text>
                        {` : ${token.token_value_days}`}
                    </Paragraph>
                    {token.remainingLightingDays && (
                        <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                            <Text style={{ fontWeight: 'bold' }}>Remaining Days</Text>
                            {` : ${token.remainingLightingDays}`}
                        </Paragraph>
                    )}
                    <Paragraph style={[styles.text, tw`mb-3 text-base`]}>
                        <Text style={{ fontWeight: 'bold' }}>Unique ID</Text>
                        {` : ${token.id}`}
                    </Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins-Regular",
    },
    textBold: {
        fontFamily: "Poppins-Bold",
    },
    button: {
        borderColor: BLUE,
        fontSize: 17,
        fontFamily: "Poppins-Bold",
    }
});

export default TokenCard;