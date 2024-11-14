import { LineChart } from "react-gifted-charts";
import { LinearGradient, Stop } from 'react-native-svg';
import { View, Text } from 'react-native'

const data = [{ value: 170 },
{ value: 220 },
{ value: 170 },
{ value: 196 },
{ value: 176 },
{ value: 141 },
{ value: 172 },]

export default function Graph() {
    const lineGradientId = 'ggrd'
    const customDataPointComp = v => {
        const isUp = v + 130 > 175;
        const color =
            v + 130 > 180 ? '#ffffff' : v + 130 > 150 ? '#F5AF22' : '#8B943B';
        return (
            <View style={{ height: 16, width: 28, alignItems: 'center' }}>
                <Text
                    style={{
                        width: 100,
                        height: 100,
                        position: 'absolute',
                        top: isUp ? -20 : 15,
                        color,
                        fontWeight: 'bold',
                        fontSize: 16,
                        fontStyle: 'italic',
                    }}>
                    {v + 130}fghgd
                </Text>
                <View
                    style={{
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: color,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            height: 6,
                            width: 6,
                            borderRadius: 3,
                            backgroundColor: color,
                        }}
                    />
                </View>
            </View>
        );
    };
    return (
        <View>
            <LineChart
                data={data}
                noOfSections={5}
                lineGradient
                lineGradientId="ggrd"
                lineGradientComponent={() => {
                    return (
                        <LinearGradient id="ggrd" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={'#EA3335'} />
                            <Stop offset="0.5" stopColor={'#F5AF22'} />
                            <Stop offset="1" stopColor={'#8B943B'} />
                        </LinearGradient>
                    );
                }}
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisOffset={130}
                customDataPoint={item => {
                    return customDataPointComp(item.value);
                }}
            />
        </View>
    )
}