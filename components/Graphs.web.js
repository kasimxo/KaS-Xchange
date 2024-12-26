import { LineChart } from "react-gifted-charts";
import { LinearGradient, Stop } from 'react-native-svg';
import { View, Text } from 'react-native'

/*
const data = [{ value: 170 },
{ value: 220, label: '1' },
{ value: 170, label: '2' },
{ value: 196, label: '3' },
{ value: 176, label: '4' },
{ value: 141, label: '5' },
{ value: 172, label: '6' },
{ value: 155, label: '7' },
{ value: 159, label: '8' },
{ value: 162, label: '9' }]
*/
export default function Graph(props) {
    const lineGradientId = 'ggrd'
    const data = props.data
    const min = props.min
    console.log("Debug graph data ", data)

    return (
        <View>
            <LineChart
                data={data}
                //color={'#336699'}
                thickness={5}
                areaChart
                yAxisOffset={min}
                yAxisLabelPrefix={'$ '}
            />
        </View>
    )
}