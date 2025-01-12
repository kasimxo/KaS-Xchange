import { View, Text } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { ExangeContexto } from '../app'
import { HStack, Button, Box } from 'native-base'
import { HistoricRatesGet } from './../api/Exhange-api'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip } from 'victory'

export default function Graph() {
    const { currOrigen, setCurrOrigen,
        currDestiny, setCurrDestiny
    } = useContext(ExangeContexto)

    const [period, setPeriod] = useState(30)
    const [rates, setRates] = useState()

    async function recoverHistoricRates() {
        return HistoricRatesGet(currOrigen, period)
            .then((data) => data
                .map(({date, rates}) => ({
                    x: date,
                    y: rates.find((el) => el.id === currDestiny).value
                }))
            )
    }

    useEffect(() => {
        recoverHistoricRates().then(setRates)
    }, [period, currOrigen, currDestiny])


    return (
        <Box
            backgroundColor={'coolGray.300'}
            borderRadius={10}
            padding={5}
        >
            <HStack
                space={3}
                justifyContent="center"
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
            {rates !== undefined ?
                <VictoryChart
                    theme={VictoryTheme.clean}
                    containerComponent={
                        <VictoryVoronoiContainer
                            voronoiDimension="x"
                            labels={({ datum }) =>
                                `${datum.y.toFixed(2)}\n${datum.x.toISOString().split('T')[0]}`
                            }
                            labelComponent={
                                <VictoryTooltip />
                            }
                        />
                    }
                >
                    <VictoryLine
                        data={rates}
                    />
                </VictoryChart>
                : null}
        </Box>
    )
}