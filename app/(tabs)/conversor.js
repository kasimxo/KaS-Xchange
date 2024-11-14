import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

const DATA = require('./../../static/currencies.json')

export default function Conversor() {
    const [currency, setCurrency] = useState();
    const [amount, setAmount] = useState(1);
    return (
        <View style={estilosConversor.container}>
            <Text>Seleccionar moneda:</Text>
            <SelectList
                setSelected={(val) => setCurrency(val)}
                data={DATA}
                save="value"
                defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                searchPlaceholder={'Buscar'}
            />
            <Text>Introducir cantidad:</Text>
            <TextInput
                style={estilosConversor.input}
                onChangeText={setAmount}
                value={amount} />
            <Text>El equivalente de {amount} {currency} es:</Text>

        </View>
    )
}

const estilosConversor = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        gap: 10,
    },
    input: {
        borderColor: 'gray',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1
    }
})