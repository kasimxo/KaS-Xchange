import { useContext, useEffect, useState } from 'react'
import { ExangeContexto } from '../app'
import { HStack, Button, Box } from 'native-base'
import { View } from 'react-native'
import { HistoricRatesGet } from './../api/Exhange-api'
import { CartesianChart, Line, PolarChart, Pie } from "victory-native"

export default function Graph() {
    const { currOrigen, setCurrOrigen,
        currDestiny, setCurrDestiny
    } = useContext(ExangeContexto)

    const [period, setPeriod] = useState(30)
    const [rates, setRates] = useState()
    async function recoverHistoricRates() {
        return HistoricRatesGet(currOrigen, period)
            .then((data) => data
                .map(({ x, rates }) => ({
                    x: x,
                    y: rates.find((el) => el.id === currDestiny).value
                }))
            )
    }

    useEffect(() => {
        recoverHistoricRates().then((result) => setRates(result))
    }, [period, currOrigen, currDestiny])

    return (
        <Box
            backgroundColor={'coolGray.300'}
            borderRadius={10}
            padding={3}
        >
            <HStack
                space={3}
                justifyContent="center"
                borderRadius={10}
                marginBottom={3}
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
            {rates !== undefined ?
                <View style={{ height: 300 }}>
                    <CartesianChart
                        data={rates}
                        xKey="x"
                        yKeys={["y"]}
                    >
                        {({ points }) => (
                            <Line points={points.y} color="red" strokeWidth={3} />
                        )}
                    </CartesianChart>
                </View>
                : null}
        </Box>
    )
}