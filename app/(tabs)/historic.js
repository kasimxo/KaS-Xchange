import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { HStack, Center, Container, Button, VStack } from 'native-base'
import Graph from '../../components/Graph'
import { HistoricRatesGet } from '../../api/Exhange-api'

const DATA = require('./../../static/currencies.json')

export default function Historic() {
    const [currOrigen, setCurrOrigen] = useState("eur")
    const [currDestiny, setCurrDestiny] = useState("USD")
    const [rates, setRates] = useState()
    const [amount, setAmount] = useState(1);
    const [period, setPeriod] = useState(30)

    async function recoverHistoricRates() {
        let arr = await HistoricRatesGet(currOrigen, period)
        if (arr === undefined) { return }
        console.log("Debug rates from historic: ", arr)
        let processedRates = []
        arr.forEach((obj) => {
            console.log("STOOP ", currDestiny, obj)
            processedRates.push({ x: obj.date, y: obj.rates.find((el) => el.id === currDestiny).value })
        })
        setRates(processedRates)
    }

    useEffect(() => {
        recoverHistoricRates()
    }, [period, currOrigen, currDestiny])

    return (
        <HStack
            justifyContent="center"
            space="20"
        >
            <VStack
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
                    <HStack>
                        <TextInput
                            style={estilosHistorico.input}
                            onChangeText={(text) => { changeAmount(text) }}
                            value={amount} />
                        <SelectList
                            setSelected={(val) => setCurrOrigen(val.split(' ')[0].toLowerCase())}
                            data={DATA}
                            save="value"
                            defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                            searchPlaceholder={'Buscar'}
                        />
                    </HStack>
                </Center>
                <Center
                    h="auto"
                    w="auto"
                    bg="coolGray.100"
                    rounded="md"
                    padding={5}
                    shadow={3} >
                    <Text>Seleccionar moneda destino:</Text>
                    <HStack>
                        <TextInput
                            style={estilosHistorico.input}
                            onChangeText={(text) => { changeAmount(text) }}
                            value={amount} />
                        <SelectList
                            setSelected={(val) => setCurrDestiny(val.split(' ')[0])}
                            data={DATA}
                            save="value"
                            defaultOption={{ key: 'USD', value: 'USD - Dólar americano' }}
                            searchPlaceholder={'Buscar'}
                        />
                    </HStack>
                </Center>
            </VStack>
            <VStack>

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
            </VStack>
        </HStack>
    )
}

const estilosHistorico = StyleSheet.create({
    container: {

        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

    },
    input: {
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1
    }
})