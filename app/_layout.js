import { Slot } from 'expo-router'
import { NativeBaseProvider } from 'native-base'

export default function Layout() {
    return (
        <NativeBaseProvider>
            <Slot />
        </NativeBaseProvider>
    )
}

