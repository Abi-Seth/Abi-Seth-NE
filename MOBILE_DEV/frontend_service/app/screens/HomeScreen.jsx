/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import Screen from './Screen'
import * as Yup from "yup";
import { useFormik } from "formik";
import tw from "twrnc";
import { BLUE, GRAY, RED } from "../config/colors";
import { Octicons, Ionicons } from "@expo/vector-icons";

import ButtonText from '../components/buttons/ButtonText'
import InputText from '../components/inputs/InputText'
import RenderLogo from '../components/logo/RenderLogo'

import { buyToken } from '../services/token.service';

export default function HomeScreen({ navigation }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fields = [
        {
            icon: <Ionicons name="md-card-outline" size={24} color="silver" />,
            placeholder: "Amount",
            value: "amount",
            secure: false,
            type: "number-pad",
            required: true,
        },
        {
            icon: <Octicons name="number" size={24} color="silver" />,
            placeholder: "Meter Number",
            value: "meterNumber",
            secure: false,
            required: true,
        },
    ];

    const initialValues = fields.reduce((tokendata, field) => {
        tokendata[field.value] = "";
        return tokendata;
    }, {});

    const validationSchema = Yup.object().shape({
        amount: Yup.number().min(100).required("Amount is required"),
        meterNumber: Yup.string()
            .length(6, 'Meter Number should be 6 digits')
            .required("Meter Number is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
    });

    const { handleChange, handleBlur, values, errors, touched } = formik;
    const isAnyFieldEmpty = fields.some(
        (field) => field.required && !values[field.value]
    );

    const handleSubmit = async () => {
        try {
            const isValid = await validationSchema.isValid(values);
            if (!isValid) {
                try {
                    validationSchema.validateSync(values, { abortEarly: false });
                } catch (errors) {
                    const fieldErrors = {};
                        errors.inner.forEach((error) => {
                        fieldErrors[error.path] = error.message;
                    });
                    formik.setErrors(fieldErrors);
                    return;
                }
            }
            setLoading(true);
            setError("");
            const response = await buyToken(values)
            const data = response?.data.data
            if (response?.data?.success) {
                setLoading(false);
                navigation.navigate('ViewTokens', { tokens: [data] });
            } else {
                setLoading(false)
                return setError(
                    response?.data?.message || "Error occurred while purchasing"
                );
            }
        } catch (error) {
            setLoading(false);
            return setError(error?.response?.data?.message || "An error occurred");
        }
    }

    return (
        <Screen>
            <View style={tw`h-[100%] bg-white justify-end items-center`}>
                <SafeAreaView style={tw`h-[96%] mt-8 w-full bg-white`}>
                    <ScrollView>
                        <View style={tw`w-full`}>
                            <RenderLogo />
                            <Text style={[styles.text, tw`text-[${GRAY}] text-center text-xl`]}>
                                Buy Electricity Token
                            </Text>
                        </View>

                        {error.length > 0 && (
                            <Text style={[styles.text,tw`mt-4 text-red-500 text-center`]}>{error}</Text>
                        )}

                        <View style={tw`mt-8`}>
                            <View style={tw`px-6 py-2`}>
                                {fields.map((field, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {}}
                                        activeOpacity={0.8}
                                        style={tw`py-2`}
                                    >
                                        <InputText
                                            Icon={field.icon}
                                            placeholder={field.placeholder}
                                            onChangeText={handleChange(field.value)}
                                            onBlur={handleBlur(field.value)}
                                            value={values[field.value]}
                                            security={field.secure}
                                            type={field?.type}
                                            borderColor={
                                                touched[field.value] && errors[field.value]
                                                ? `${RED}`
                                                : `${GRAY}`
                                            }
                                        />
                                        {touched[field.value] && errors[field.value] && (
                                            <Text style={tw`text-red-500`}>
                                                {errors[field.value]}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                ))}

                                <View style={tw`mt-8`}>
                                    <ButtonText
                                        mode={"contained"}
                                        style={[styles.text,tw`w-full p-[10] mt-4 text-2xl`]}
                                        onPress={handleSubmit}
                                        disabled={isAnyFieldEmpty || loading || !formik.isValid}
                                    >
                                        {loading ? "Purchasing token ..." : "Purchase Token"}
                                    </ButtonText>
                                </View>
                            </View>
                        </View>

                        <View style={tw`mt-10 items-center justify-center mb-8`}>
                            <Text>OPTIONS MENU</Text>
                            <View style={tw`items-center w-[80]`}>
                                <ButtonText
                                    mode={"contained"}
                                    style={[styles.text,tw`w-full p-[10] mt-4 text-2xl`]}
                                    onPress={() => navigation.navigate('SearchTokensOnMeter')}
                                >
                                    View All Tokens
                                </ButtonText>
                                <ButtonText
                                    mode={"contained"}
                                    style={[styles.text, tw`w-full p-[10] mt-2 text-2xl`]}
                                    onPress={() => navigation.navigate('Home')}
                                >
                                    Validate Token
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