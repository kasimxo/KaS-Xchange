import { View, Text, FlatList, TextInput } from 'react-native'
import { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

const DATA = [
    {
        key: 'USD',
        value: 'USD - Dólar americano'
    },
    {
        key: 'EUR',
        value: 'EUR - Euro'
    },
    {
        key: 'GBP',
        value: 'GBP - Libra esterlina'
    },
    {
        key: 'CHF',
        value: 'CHF - Franco suizo'
    },
    {
        key: 'JPY',
        value: 'JPY - Yen japonés'
    },
    {
        key: 'HKD',
        value: 'HKD - Dólar hongkonés'
    },
    {
        key: 'CAD',
        value: 'CAD - Dólar canadiense'
    },
    {
        key: 'CNY',
        value: 'CNY - Yuan chino'
    },
    {
        key: 'AUD',
        value: 'AUD - Dólar australiano'
    },
    {
        key: 'BRL',
        value: 'BRL - Real brasileño'
    },
    {
        key: 'RUB',
        value: 'RUB - Rublo ruso'
    },
    {
        key: 'MXN',
        value: 'MXN - Peso mexicano'
    },
]

export default function Conversor() {
    const [selected, setSelected] = useState();
    return (
        <View>
            <Text>Seleccionar moneda:</Text>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={DATA}
                save="value"
                defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                searchPlaceholder={'Buscar'}
            />
            <Text>Introducir cantidad:</Text>

            <Text>El equivalente de x(cantidad) y(moneda) es:</Text>

        </View>
    )
}