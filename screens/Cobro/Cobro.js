import axios from "axios";
import react, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { Searchbar } from 'react-native-paper';
import { COLORS, SIZES, FONTS, icons } from '../../constants';
import uri from "../../constants/environment";

const Cobro = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [searchQuery, setSearchQuery] = useState('')
    const [cobros, setCobros] = useState([])

    useEffect(() => { 
        const getData = async () => {
            try{
                const response = await axios.get(`${uri.uri}/cobros/disponibles-cobro/1`)
                setCobros(response.data)
            }
            catch(ex){
                console.log(ex)
            }
        }

        if(isFocused){
            getData()
        }
        return () => {

        }
    }, [isFocused])

    const onChangeSearch = () => {

    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: SIZES.base,
                fontFamily:'verdana'
            }}
            onPress={() => {
                    const params = { 
                        cliente: item.nombre, 
                        idPrestamo: item.idPrestamo, 
                        montoTotal: item.montoConInteres, 
                        montoAbonado:item.total, 
                        cuotaDiaria: item.cobroDiario, 
                        idCobro: item.idCobro 
                    }
                    !item.cobro ? navigation.navigate('AddCobro', params) : navigation.navigate('EditCobro', params)
                }
            }
            onLongPress={() => alert('Deseas eliminarlo')}
        >
            <Image
                source={icons.transaction}
                style={{
                    width: 30, 
                    height: 30, 
                    tintColor: COLORS.primary
                }}
            />
            <View style={{ flex: 1, marginLeft: SIZES.radius}}>
                <Text style={{ ...FONTS.h3, fontFamily:'verdana' }} >{item.nombre}</Text>
                <Text style={{ color: COLORS.gray, ...FONTS.body4}}>
                    Prestamo: {item.montoConInteres}, Cuota: {item.cobroDiario}, Saldo: {item.total ? item.total : 0.00}
                </Text>
            </View>

            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                <Text style={{ color: !item.cobro ? COLORS.red : COLORS.green}}>{item.cobro ? item.cobro : 'Pte.'} </Text>
                <Image 
                    source={icons.right_arrow}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}    
                />
            </View>
        </TouchableOpacity>
        )

    }

    return (
        <View style={{ backgroundColor: COLORS.white}}>
            <Text style={{ marginTop: 40, color:'grey', fontSize:'18', fontWeight:'500', padding: 5, textAlign:'center'}}>Hola mucha como estamos</Text>
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} loading={false} style={{ borderRadius:12, marginHorizontal: 15, backgroundColor:COLORS.white }} />
            { cobros.length > 0 &&
                <View 
                    style={{
                        marginTop: 20,
                        marginHorizontal: 15,
                        padding: 5, 
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white,
                        ...styles.shadow
                    }}
                >
                    <Text style={{ ...FONTS.h2, textAlign:'center', fontFamily:'verdana' }}>
                        Transacciones de hoy
                    </Text>
                    <FlatList
                        contentContainerStyle={{ marginTop: SIZES.radius }}
                        scrollEnabled={false}
                        data={cobros}
                        keyExtractor={item =>  `${item.idPrestamo}`}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={{width: "100%", height: 1, backgroundColor: COLORS.lightGray}}></View>
                            )
                        }}
                    >
                    </FlatList>
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})


export default Cobro