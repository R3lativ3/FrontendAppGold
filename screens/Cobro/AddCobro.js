import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"
import { TextInput, Button, Avatar, Card, Chip, Dialog, Portal, Paragraph } from 'react-native-paper';
import * as Location from 'expo-location'
import uri from "../../constants/environment";

const AddCobro = ({ route, navigation }) => {
    const { cliente, idPrestamo, montoTotal, montoAbonado, cuotaDiaria } = route.params

    const [cobro, setCobro] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLat(location.coords.latitude)
            setLon(location.coords.longitude)
        })();
    }, []);

    const sendCobro = async () => {
        try{
            setLoading(true)
            const response = await axios.post(`${uri.uri}/cobros`, { idPrestamo, cobro, lat, lon })
            console.log(response)
            setResponse(JSON.stringify(response))
            setLoading(false)
        }
        catch(exception){
            setLoading(false)
            console.log('aqui',exception)
            setResponse(exception)
        }
    }

    const dialog = () => {
        return (
            <Portal>
              <Dialog>
                <Dialog.Title>Enviado</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{response}</Paragraph>
                </Dialog.Content>
              </Dialog>
            </Portal>
        )
    }

    return (
        <View>
            { errorMsg && <Text>{ errorMsg }</Text> }
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
                    <Button icon="check-circle-outline" loading={loading} disabled={loading} mode="elevated" buttonColor="black" textColor="white" style={{ marginHorizontal:40, marginVertical:20 }} onPress={sendCobro}> Guardar </Button>
                </Card.Content>
            </Card>
        </View>
    )
}

export default AddCobro