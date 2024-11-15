import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { CurrencyRatesGET } from '../../api/Exhange-api';

const DATA = require('./../../static/currencies.json')

export default function Conversor() {
    const [currency, setCurrency] = useState();
    const [amount, setAmount] = useState(1);
    const [ratesOrg, setRatesOrg] = useState()
    const [rates, setRates] = useState();

    useEffect(() => {
        if (rates === undefined || rates === null) {

            loadRates()
        }
    }, [rates])

    async function loadRates() {
        let dataRates = await CurrencyRatesGET()
        console.log(dataRates)
        setRatesOrg(dataRates)
        setRates(dataRates)
    }

    function changeAmount(text) {
        setAmount(text)
        if (Number.isNaN(Number.parseInt(text))) {
            return
        }
        let calculateRates = []
        ratesOrg.forEach((rate) => {
            calculateRates.push({ id: rate.id, value: rate.value * Number.parseInt(text) })
        })
        setRates(calculateRates)
    }

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
                onChangeText={(text) => { changeAmount(text) }}
                value={amount} />
            <Text>El equivalente de {amount} {currency} es:</Text>

            <FlatList
                data={rates}
                renderItem={({ item }) => <Text>{item.id} {item.value}</Text>}
                keyExtractor={item => item.id}
            />
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