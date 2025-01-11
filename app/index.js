import { useState, createContext } from 'react'
import { HStack, VStack, Text, Heading } from 'native-base'
import Graph from './../components/Graph'
import Conversor from '../components/Conversor'
import 'react-native-reanimated'

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
            <VStack
                padding={25}
            >
                <Heading
                    size="xl"
                    marginBottom={3}
                >
                    Xchange
                </Heading>
                <Text>
                    Bienvenido a KaS-Xchange!
                    Un pequeño conversor de moneda construido con React Native para web y dispositivos Android.
                    Este proyecto ha sido creado con fines educativos y por tanto la información con respecto a los ratios de conversión
                    puede no ser correcta.
                </Text>
                <HStack
                    justifyContent={"center"}
                    space={20}
                    alignContent={"center"}
                    margin={50}
                    bg="muted.100"
                    size={"full"}
                >
                    <Conversor />
                    <Graph />
                </HStack>
            </VStack>
        </ExangeProvider>
    )
}
