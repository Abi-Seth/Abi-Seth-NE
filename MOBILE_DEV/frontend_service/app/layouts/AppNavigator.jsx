/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ViewTokensScreen from '../screens/ViewTokensScreen'
import SearchTokensOnMeterScreen from '../screens/SearchTokensOnMeterScreen'
import ValidateTokenScreen from '../screens/ValidateTokenScreen'

const Stack = createNativeStackNavigator()
export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SearchTokensOnMeter'
                component={SearchTokensOnMeterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ValidateToken'
                component={ValidateTokenScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ViewTokens'
                component={ViewTokensScreen}
                options={({ route }) => ({
                    headerShown: false,
                    tokens: route.params?.tokens
                })}
            />
        </Stack.Navigator>
    )
}