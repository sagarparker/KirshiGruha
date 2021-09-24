import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import homeScreen from './screens/homeScreen';
import sellScreen from './screens/sellScreen';
import buyScreen from './screens/buyScreen';
import pastOrders from './screens/pastOrders';
import itemsSold from './screens/itemsSold';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function LogoTitle() {
  return (
    <View style={{flexDirection:'row'}}>
          <Image
            style={{ width:30, height: 30 }}
            source={require('./assets/headerlogo.png')}
          />
          <Text style={{fontSize:20,color:'white',paddingLeft:5,fontFamily:'monospace'}}>KrishiGruha</Text>
    </View>

  );
}

function mainStack(){
  return(
    <Drawer.Navigator 
      drawerStyle={{
        backgroundColor: '#f0f0f0',
        width:230
      }}

      drawerContentOptions={{
        style:{
          width:227,
        },
        labelStyle:{
          fontSize:15,
          fontFamily:'monospace'
        },
        activeBackgroundColor:'white',
        activeTintColor:'green',
        itemStyle:{
          borderRadius:30,
          paddingLeft:10          
        },
        contentContainerStyle:{
          marginTop:-30,
        }
      }}
      initialRouteName="home">
      <Drawer.Screen name="Home"  component={homeScreen} />
      <Drawer.Screen name="Your orders" component={pastOrders} />
      <Drawer.Screen name="Items sold" component={itemsSold}/>
      <Drawer.Screen name="Logout" options={{
          swipeEnabled: false,
        }} component={loginScreen}/>
    </Drawer.Navigator>
  )
}




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login"
        screenOptions={{
          animationEnabled:false,
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'green',
            height:87
          },
          headerTintColor:'white',
          headerTitle:props=><LogoTitle {...props}/>
        }}>
        <Stack.Screen name="login" component={loginScreen} options={{title:'Krish Gruha'}}/>
        <Stack.Screen name="register" component={registerScreen} options={{title:'Krishi Gruha'}}/>
        <Stack.Screen name="mainstack" component={mainStack} options={{title:'Krishi Gruha'}}/>
        <Stack.Screen name="sell" component={sellScreen} options={{title:'Krishi Gruha '}}/> 
        <Stack.Screen name="buy" component={buyScreen} options={{title:'Krishi Gruha'}}/>  
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
