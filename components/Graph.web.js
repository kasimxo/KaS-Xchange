import { View, Text } from 'react-native'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'

export default function Graph(props) {
    const data = props.data
    const min = props.min
    console.log("Debug graph data ", data)
    return (
        <View>
            <VictoryChart
                theme={VictoryTheme.clean}
            >
                <VictoryLine
                    data={data}
                />
            </VictoryChart>

        </View>
    )
}