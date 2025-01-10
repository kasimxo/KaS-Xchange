import { View, StyleSheet } from 'react-native'
import { Box } from 'native-base'
import { useRef, useState, useEffect, useContext } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { ExangeContexto } from '../app';

export function DropDownList(props) {
    let data = props.data

    const { currOrigen, setCurrOrigen,
        currDestiny, setCurrDestiny
    } = useContext(ExangeContexto)
    const [height, setHeight] = useState(null); // Almacena la altura inicial
    const contentRef = useRef(null); // Referencia al contenido hijo
    useEffect(() => {
        console.log("ABOUT TO DEBUG: ", contentRef.current)
        // Medir la altura del hijo una vez que se monta
        if (contentRef.current) {
            contentRef.current.measure((x, y, width, measuredHeight) => {
                setHeight(measuredHeight); // Guardar la altura inicial del hijo
                console.log("DEBUG ALTURA: ", measuredHeight)
            });
        }
    }, []);


    return (
        <Box
            height={height ? `${height}px` : 'auto'}
        >
            <View
                ref={contentRef}
                onLayout={(event) => {
                    if (!height) {
                        const { height: measuredHeight } = event.nativeEvent.layout;
                        setHeight(measuredHeight);
                    }
                }}
            >
                <SelectList
                    setSelected={(val) => setCurrOrigen(val.split(' ')[0].toLowerCase())}
                    data={data}
                    save="value"
                    dropdownStyles={estilosDropDownList.currList}
                    overflow="visible"
                    defaultOption={{ key: 'EUR', value: 'EUR - Euro' }}
                    searchPlaceholder={'Buscar'}
                />
            </View>
        </Box >
    )
}

const estilosDropDownList = StyleSheet.create({
    currList: {
        zIndex: 900, // works on ios
        backgroundColor: "#f3f4f6",
        elevation: 900, // works on android
    }
})