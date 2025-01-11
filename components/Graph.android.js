import { useContext, useEffect, useState } from 'react'
import { ExangeContexto } from '../app'
import { HStack, Button, Box } from 'native-base'
import { HistoricRatesGet } from './../api/Exhange-api'
import { CartesianChart, Line } from "victory-native"

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

        for (let i = 0; i < arr.length; i++) {
            let obj = arr[i]
            processedRates.push({ x: obj.date, y: obj.rates.find((el) => el.id === currDestiny).value })
        }
        /*
                arr.forEach((obj) => {
                    console.log("ARR RET OBJ ", obj)
                    processedRates.push({ x: obj.date, y: obj.rates.find((el) => el.id === currDestiny).value })
                })
        */
        setRates(processedRates)
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
                <CartesianChart data={rates} xKey="x" yKeys={["y"]}>
                    {({ points }) => (
                        //👇 pass a PointsArray to the Line component, as well as options.
                        <Line
                            points={points.y}
                            color="red"
                            strokeWidth={3}
                            animate={{ type: "timing", duration: 300 }}
                        />
                    )}
                </CartesianChart>
                : null}
        </Box>
    )
}