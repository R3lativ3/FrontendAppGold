import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { Home, CryptoDetail, Cobros } from "../screens"
import { COLORS, FONTS, icons } from "../constants"
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow
            }}
            onPress={onPress}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                right: 0,
                headerShown: false
            })
            } 
        >
            <Tab.Screen
                name="Homex"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.home}
                                resizeMode="contain"
                                style={{
                                    width: 20, 
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Home</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={CryptoDetail}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.pie_chart}
                                resizeMode="contain"
                                style={{
                                    width: 20, 
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>PORTFOLIO</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={Cobros}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.transaction}
                            resizeMode="contain"
                            style={{
                                width:30,
                                height: 30,
                                tintColor: COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Prices"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.line_graph}
                                resizeMode="contain"
                                style={{
                                    width: 20, 
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>PRICES</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={icons.settings}
                                resizeMode="contain"
                                style={{
                                    width: 20, 
                                    height: 20,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body5}}>Settings</Text>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;