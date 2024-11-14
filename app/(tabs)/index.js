import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Link } from 'expo-router';

export default function Index() {
    // Pequeña descripción del proyecto y dos links a las páginas
    return (
        <View style={estilosIndex.container}>
            <Text>Página bienvenida</Text>
            <Link href="/conversor" asChild>
                <Pressable style={estilosIndex.sections}>
                    <Text>
                        A Convertir!
                    </Text>
                </Pressable>
            </Link>
            <Link href="/historic"
                style={estilosIndex.sections}
                asChild>
                <Pressable>
                    <Text>
                        A Historear!
                    </Text>
                </Pressable>
            </Link>
        </View>
    )
}

const estilosIndex = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    sections: {
        backgroundColor: '#84ba93',
        padding: 5,
        borderRadius: 5,
    }
})