import { useState, createContext } from 'react'
import { HStack, VStack, Text, Heading, ScrollView } from 'native-base'
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
                padding={15}
            >
                <ScrollView>
                    <Heading
                        size="xl"
                        marginBottom={3}
                        marginTop={3}
                    >
                        Xchange
                    </Heading>
                    <Text>
                        Bienvenido a KaS-Xchange!
                        Un pequeño conversor de moneda construido con React Native para web y dispositivos Android.
                        Este proyecto ha sido creado con fines educativos y por tanto la información con respecto a los ratios de conversión
                        puede no ser correcta.
                    </Text>
                    <VStack
                        justifyContent={"center"}
                        space={5}
                        alignContent={"center"}
                        margin={5}
                        bg="muted.100"
                        size={"full"}
                    >
                        <Graph />

                        <Conversor />
                    </VStack>
                </ScrollView>
            </VStack>
        </ExangeProvider>
    )
}
