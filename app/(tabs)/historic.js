import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { HStack, Center, Container, Button } from 'native-base'
import Graph from '../../components/Graph'
import { HistoricRatesGet } from '../../api/Exhange-api'

const DATA = require('./../../static/currencies.json')

export default function Historic() {
    const [currOrigen, setCurrOrigen] = useState("eur")
    const [currDestiny, setCurrDestiny] = useState("USD")
    const [rates, setRates] = useState()
    const [period, setPeriod] = useState(30)

    async function recoverHistoricRates() {
        let arr = await HistoricRatesGet(currOrigen, period)
        if (arr === undefined) { return }
        console.log("Debug rates from historic: ", arr)
        let processedRates = []
        arr.forEach((obj) => {
            console.log("STOOP ", currDestiny, obj)
            processedRates.push({ x: obj.x, y: obj.rates.find((el) => el.id === currDestiny).value })
        })
        setRates(processedRates)
    }

    useEffect(() => {
        recoverHistoricRates()
    }, [period, currOrigen, currDestiny])

    return (
        <View style={estilosHistorico.container}>
            <HStack
                space={3}
                justifyContent="center"
                backgroundColor={'coolGray.300'}
                padding={5}
                borderRadius={10}
            >
                <Center
                    h="auto"
                    w="auto"
                    bg="coolGray.100"
                    rounded="md"
                    padding={5}
                    shadow={3} >
                    <Text>Seleccionar moneda origen:</Text>
                    <SelectList
                        setSelected={(val) => setCurrOrigen(val.split(' ')[0].toLowerCase())}
                        data={DATA}
                        save="value"
                        defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                        searchPlaceholder={'Buscar'}
                    />
                </Center>
                <Center
                    h="auto"
                    w="auto"
                    bg="coolGray.100"
                    rounded="md"
                    padding={5}
                    shadow={3} >
                    <Text>Seleccionar moneda destino:</Text>
                    <SelectList
                        setSelected={(val) => setCurrDestiny(val.split(' ')[0])}
                        data={DATA}
                        save="value"
                        defaultOption={{ key: 'USD', value: 'USD - Dólar americano' }}
                        searchPlaceholder={'Buscar'}
                    />
                </Center>
            </HStack>
            <HStack
                space={3}
                justifyContent="center"
                backgroundColor={'coolGray.300'}
                padding={5}
                borderRadius={10}
            >
                <Button
                    onPress={() => {
                        setPeriod(30)
                    }}
                >
                    30 D
                </Button>
                <Button
                    onPress={() => {
                        setPeriod(7)
                    }}
                >
                    7 D
                </Button>
            </HStack>
            <Graph data={rates} />



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