import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { TextInput, Button, Avatar, Card, Chip, Dialog, Paragraph } from 'react-native-paper';
import uri from '../../constants/environment'

const EditCobro = ({ route, navigation }) => {
    const isFocused = useIsFocused()
    const [cobro, setCobro] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const { idPrestamo, idCobro, cliente, montoTotal, montoAbonado, cuotaDiaria  } = route.params

    useEffect(() => {
        const getCobro = async () => {
            try{
                setLoadingData(true)
                const { data: dat } = await axios.get(uri.uri+'/cobros/'+idCobro)
                setData(dat.response)
                setCobro(dat.response.cobro)
                setLoadingData(false)
            }
            catch(exception){
                console.log(exception)
                setLoadingData(false)
            }
        }
        
        if(isFocused){
            getCobro()
        }

        return () => {

        }
    }, [isFocused])

    const updateCobro = async () => {
        try{
            setLoading(true)
            const response = await axios.put(uri.uri+'/cobros/'+idCobro, { cobro })
            console.log(response)
            setLoading(false)
        }
        catch(exception){
            console.log(exception)
            setLoading(false)
        }
    }

    return (
        <View>
            { loadingData ? <Text>Loading...</Text> : 
                <Card style={{backgroundColor:"white"}} mode="contained">
                    <Card.Title
                        title={cliente}
                        subtitle={"Total Prestamo:"+montoTotal}
                        left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    />
                    <Card.Content>
                        <View style={{  flexDirection:'row', flexWrap:'wrap', marginBottom: 20 }}>
                            <Chip icon="information" onTouchStart={() => alert('sds','haskdjhsd')} selectedColor="white" style={{ backgroundColor:"black", marginHorizontal:5}} onPress={() => console.log('Pressed')}>Abonado: {montoAbonado}</Chip>
                            <Chip icon="information" selectedColor="white" style={{ backgroundColor:"black", marginHorizontal:5}} onPress={() => console.log('Pressed')}>Cuota: {cuotaDiaria}</Chip>
                        </View>
                        <TextInput label="Cobro" value={cobro} keyboardType="numeric" style={{ marginLeft:10, marginRight:10}} onChangeText={setCobro} mode="outlined" outlineColor="black" activeOutlineColor="black"/>
                        <Button icon="check-circle-outline" loading={loading} disabled={loading} mode="elevated" buttonColor="black" textColor="white" style={{ marginHorizontal:40, marginVertical:20 }} onPress={updateCobro}> Guardar </Button>
                    </Card.Content>
                </Card>
            }
        </View>
    )
}

export default EditCobro