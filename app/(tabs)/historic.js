import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import Graph from '../../components/Graphs'

const DATA = require('./../../static/currencies.json')

export default function Historic() {
    const [currOrigen, setCurrOrigen] = useState()
    const [currDestiny, setCurrDestiny] = useState()
    return (
        <View style={estilosHistorico.container}>
            <Text>Seleccionar moneda origen:</Text>
            <SelectList
                setSelected={(val) => setCurrOrigen(val)}
                data={DATA}
                save="value"
                defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                searchPlaceholder={'Buscar'}
            />
            <Text>Seleccionar moneda destino:</Text>
            <SelectList
                setSelected={(val) => setCurrDestiny(val)}
                data={DATA}
                save="value"
                defaultOption={{ key: 'USD', value: 'USD - Dólar americano' }}
                searchPlaceholder={'Buscar'}
            />
            <Graph />
        </View>
    )
}

const estilosHistorico = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
})