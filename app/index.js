import { useEffect, useState, createContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { HStack, Center, Container, Button, VStack } from 'native-base'
import Graph from './../components/Graph'
import { HistoricRatesGet } from '../api/Exhange-api'
import Conversor from '../components/Conversor'

const DATA = require('../static/currencies.json')

export const ExangeContexto = createContext()
export const ExangeProvider = ({ children }) => {
    const [currOrigen, setCurrOrigen] = useState("eur")
    const [currDestiny, setCurrDestiny] = useState("USD")
    return (
        < ExangeContexto.Provider
            value={
                {
                    currOrigen, setCurrOrigen,
                    currDestiny, setCurrDestiny
                }
            } >
            {children}
        </ExangeContexto.Provider >
    )
}


export default function Index() {
    return (
        <ExangeProvider>
            <HStack
                justifyContent={"center"}
                space={20}
                alignContent={"center"}
                margin={50}
            >
                <Conversor />
                <Graph />
            </HStack>
        </ExangeProvider>
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