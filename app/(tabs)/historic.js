import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { HStack, Center, Container } from 'native-base'
import Graph from '../../components/Graphs'
import { HistoricRatesGet } from '../../api/Exhange-api'



const DATA = require('./../../static/currencies.json')

export default function Historic() {
    const [currOrigen, setCurrOrigen] = useState()
    const [currDestiny, setCurrDestiny] = useState()
    const [min, setMin] = useState(Infinity)
    const [rates, setRates] = useState()

    useEffect(() => {
        async function recoverHistoricRates() {

            let arr = await HistoricRatesGet("eur")
            console.log("Debug rates from historic: ", arr)
            let processedRates = []
            arr.sort((a, b) => a.order - b.order)
            console.log("order ", arr)
            arr.forEach((obj) => {
                //We should select currency with currDestiny and not by position
                processedRates.push({ value: obj.rates[0].value })
                if (obj.rates[0].value < min) {
                    setMin(obj.rates[0].value)
                }
            })
            setRates(processedRates)
        }
        recoverHistoricRates()
    }, [])





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
                        setSelected={(val) => setCurrOrigen(val)}
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
                        setSelected={(val) => setCurrDestiny(val)}
                        data={DATA}
                        save="value"
                        defaultOption={{ key: 'USD', value: 'USD - Dólar americano' }}
                        searchPlaceholder={'Buscar'}
                    />
                </Center>
            </HStack>
            <Graph data={rates} min={min} />



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