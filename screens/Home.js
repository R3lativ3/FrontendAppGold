import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    LogBox
} from 'react-native';
import { Box } from "native-base"
import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';
import { PriceAlert, TransactionHistory, HeaderBar } from "../components"

const Home = ({ navigation }) => {

    const [trending, setTrending] = useState(dummyData.trendingCurrencies)
    const [transactionHistory, setTransactionHistory] = useState(dummyData.transactionHistory)

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    })
// 
    function renderHeader(){
        
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                style={{
                    width: 180,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.white
                }}
                onPress={
                    () => navigation.navigate('CryptoDetail', {currency: item}
                )}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        
                    </View>
                    <View style={{ marginLeft: SIZES.base }}>
                        <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.code}</Text>
                    </View>
                </View>

                <View style={{ marginTop: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3 }}>${item.amount}</Text>
                    <Text style={{ color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h4 }}>{item.changes}</Text>

                </View>
            </TouchableOpacity>
        )
     
        return (
            <View
                style={{
                    width: "100%",
                    height: 290,
                    ...styles.shadow
                }}
            >
                <ImageBackground
                    source={images.img1}
                    resizeMode="cover"
                    style={{
                        flex: 1,
                        alignItems: 'center'
                    }}
                >
                    {/* Header bar */}
                        <View
                            style={{
                                marginTop: SIZES.padding * 2,
                                width: "100%",
                                alignItems: "flex-end",
                                paddingHorizontal: SIZES.padding
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 35, 
                                    height: 35, 
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}

                                onPress={() => console.log("notificacion pressed")}
                            >
                                <Image
                                    source={icons.notification_white}
                                    resizeMode="contain"
                                    style={{ flex: 1 }}
                                />
                            </TouchableOpacity>

                        </View>

                    {/* balance */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3}}> Tu Cobro Semanal </Text>
                        <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1 }}>Q 5,450.00</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body5}}>{dummyData.portfolio.changes} Ultimos 4 Dias</Text>
                    </View>

                    {/* Trending */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: "-30%"
                        }}
                    >
                        <FlatList
                            contentContainerStyle={{ marginTop: SIZES.base }}
                            data={trending}
                            renderItem={renderItem}
                            keyExtractor={item => `${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >

                        </FlatList>
                    </View>

                </ImageBackground>
            </View>
        )
    }

    function renderAlert(){
        return (
            <PriceAlert />
        )
    }

    function renderNotice(){
        return (
            <View 
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20, 
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.secondary,
                    ...styles.shadow
                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h3}}>Comparativa Mensual</Text>
                <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.body4, lineHeight: 18}}>
                    Ver comparativa de progreso entre otros meses para mejorar cartera
                </Text>

                <TouchableOpacity
                    style={{
                        marginTop: SIZES.base
                    }}
                    onPress={() => console.log('read more')}
                >
                    <Text style={{ textDecorationLine: 'underline', color: COLORS.green, ...FONTS.h3 }}> Ver Mas</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderTransactionHistory(){
        return (
            <TransactionHistory 
                customContainerStyle={{ ...styles.shadow }}
                history={transactionHistory}
            />
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, paddingBottom: 130 }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
                {renderTransactionHistory()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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

export default Home;