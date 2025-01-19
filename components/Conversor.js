import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { CurrencyRatesGET } from '../api/Exhange-api';
import { VStack, Center, HStack } from 'native-base';
import { ExangeContexto } from '../app';
import { DropDownList } from './DropDownList';

const DATA = require('./../static/currencies.json')

export default function Conversor() {
    const { currOrigen, setCurrOrigen,
        currDestiny, setCurrDestiny
    } = useContext(ExangeContexto)
    const [amountOrigen, setAmountOrigen] = useState(1);
    const [amountDestiny, setAmountDestiny] = useState(0)
    const [ratesOrg, setRatesOrg] = useState()
    const [rates, setRates] = useState();

    useEffect(() => {
        if (rates === undefined || rates === null) {
            loadRates('eur')
        }
    }, [rates])

    async function loadRates(curr) {
        setCurrOrigen(curr)
        let dataRates = await CurrencyRatesGET(curr.toLowerCase())

        setRatesOrg(dataRates)

        let calculateRates = []
        dataRates.forEach((rate) => {
            calculateRates.push({ id: rate.id, value: rate.value * Number.parseFloat(amountOrigen), ratio: rate.value })
        })
        setRates(calculateRates)
        let destinyAmount = calculateRates.find((el) => el.id === currDestiny).value
        setAmountDestiny(destinyAmount)
    }

    function changeamountOrigen(text) {
        setAmountOrigen(text)
        if (Number.isNaN(Number.parseFloat(text))) {
            return
        }
        let calculateRates = []
        ratesOrg.forEach((rate) => {
            calculateRates.push({ id: rate.id, value: rate.value * Number.parseFloat(text), ratio: rate.value })
        })
        let destinyAmount = calculateRates.find((el) => el.id === currDestiny).value
        setAmountDestiny(destinyAmount)
        setRates(calculateRates)
    }

    function changeamountDestiny(text) {
        setAmountDestiny(text)
        if (Number.isNaN(Number.parseFloat(text))) {
            return
        }
        let amountOrg = Number.parseFloat(text) / rates.find((el) => el.id === currDestiny).ratio
        setAmountOrigen(amountOrg)
    }

    return (
        <VStack
            space={3}
            justifyContent="center"
            backgroundColor={'coolGray.300'}
            padding={5}
            borderRadius={10}
            zIndex={999}
        >
            <Center
                h="auto"
                w="auto"
                bg="coolGray.100"
                rounded="md"
                padding={5}
                shadow={3}
                zIndex={300}
            >
                <Text>Seleccionar moneda origen:</Text>
                <HStack
                    justifyContent="space-between"
                    height="auto"
                    zIndex={300}
                    space={2}
                >
                    <TextInput
                        style={estilosConversor.input}
                        onChangeText={(text) => { changeamountOrigen(text) }}
                        value={amountOrigen} />
                    <DropDownList data={DATA} />
                </HStack>
            </Center>
            <Center
                h="auto"
                w="auto"
                bg="coolGray.100"
                rounded="md"
                padding={5}
                shadow={3}
                zIndex={1}
            >
                <Text>Seleccionar moneda destino:</Text>
                <HStack
                    space={2}
                >
                    <TextInput
                        style={estilosConversor.input}
                        onChangeText={(text) => { changeamountDestiny(text) }}
                        value={amountDestiny} />
                    <DropDownList data={DATA} />
                </HStack>
            </Center>
        </VStack>
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