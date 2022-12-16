import React from 'react';
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base'
import Tabs from "./navigation/tabs";
import Cobro from './screens/Cobro/Cobro';
import AddCobro from './screens/Cobro/AddCobro';
import EditCobro from './screens/Cobro/EditCobro';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          
          initialRouteName={'Regresar'}
        >
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ headerShown: false, header: null }}
          />
          <Stack.Screen
            name="CryptoDetail"
            component={CryptoDetail}
          />
          <Stack.Screen
            name="Transaction"
            component={Transaction}
          />
          <Stack.Screen
            name="AddCobro"
            options={{ title: 'Agregar Cobro', headerBackTitle:'Cobros',  headerShown: true }}
            component={AddCobro}
          />
          <Stack.Screen
            name="EditCobro"
            options={{ title: 'Editar Cobro', headerBackTitle:'Cobros',  headerShown: true }}
            component={EditCobro}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

  )
}

export default App;