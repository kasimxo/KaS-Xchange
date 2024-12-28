import { View, Text } from 'react-native'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip } from 'victory'

export default function Graph(props) {
    const data = props.data
    const min = props.min
    console.log("Debug graph data ", data)
    return (
        <View>
            {data !== undefined ?
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
                        data={data}
                    />
                </VictoryChart>
                : null}

        </View>
    )
}