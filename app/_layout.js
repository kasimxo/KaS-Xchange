import { Slot } from 'expo-router'
import { NativeBaseProvider } from 'native-base'
import { View, StyleSheet } from 'react-native'
export default function Layout() {
    return (
        <View
            style={estilosXchange.container}
        >
            <NativeBaseProvider>
                <Slot />
            </NativeBaseProvider>
        </View>
    )
}


const estilosXchange = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: "#f5f5f5"
    },
    input: {
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1
    }
})