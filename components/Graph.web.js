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
        let arr = await HistoricRatesGet(currOrigen, period)
        if (arr === undefined) { return }
        let processedRates = []
        console.log("ABOUT TO ITERATE: ", arr, arr.length, arr["0"])

        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i]
            console.log(obj)
            processedRates.push({ x: obj.date, y: obj.rates.find((el) => el.id === currDestiny).value })

        }
        /*
                arr.forEach((obj) => {
                    console.log("ARR RET OBJ ", obj)
                    processedRates.push({ x: obj.date, y: obj.rates.find((el) => el.id === currDestiny).value })
                })
          */
        setRates(processedRates)
        console.log("DONE ITERATING")
    }

    useEffect(() => {
        recoverHistoricRates()
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