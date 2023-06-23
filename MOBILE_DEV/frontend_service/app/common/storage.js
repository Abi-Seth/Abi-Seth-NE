import AsyncStorage from "@react-native-async-storage/async-storage";

const key = 'auth_token'

const storeToken = async token => await AsyncStorage.setItem(key, token)

const getToken = async () => await AsyncStorage.getItem(key)

const removeToken = async () => await AsyncStorage.removeItem(key)

export { storeToken, getToken, removeToken }