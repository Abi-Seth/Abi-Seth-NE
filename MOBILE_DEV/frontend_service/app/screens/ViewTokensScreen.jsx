/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import tw from "twrnc";
import Screen from './Screen'
import { GRAY } from '../config/colors'
import RenderLogo from '../components/logo/RenderLogo'
import TokenCard from '../components/cards/TokenCard'
import ButtonText from '../components/buttons/ButtonText'

export default function ViewTokensScreen({ navigation, route }) {
    const { tokens } = route.params;
    return (
        <Screen>
            <View style={tw`h-[100%] bg-white justify-end items-center`}>
                <SafeAreaView style={tw`h-[96%] mt-8 w-full bg-white`}>
                    <ScrollView>
                        <View style={tw`w-full pl-2 mb-3`}>
                            <RenderLogo />
                            <Text style={[styles.text, tw`text-[${GRAY}] text-center text-xl`]}>
                                View Token Details
                            </Text>
                        </View>
                        <View style={tw`w-[100%] flex items-center`}>
                            {tokens && 
                                tokens.map(token => (
                                    <View key={token.id}>
                                        <TokenCard token={token} />
                                    </View>
                                ))
                            }
                        </View>
                        <View style={tw`w-full justify-center items-center mb-5`}>
                            <View style={tw`w-[85] justify-center items-center`}>
                                <ButtonText
                                    mode={"contained"}
                                    style={[styles.text,tw`w-full p-[10] mt-4 text-2xl`]}
                                    onPress={() => navigation.navigate('Home')}
                                >
                                    Back To Purchase
                                </ButtonText>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins-Regular",
    },
    textBold: {
        fontFamily: "Poppins-Bold",
    },
});