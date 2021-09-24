import React,{useState,useEffect} from 'react'
import { View,Image,StyleSheet,Dimensions,ScrollView,Alert } from 'react-native'
import {Text,Input,Button} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const buyScreen = ({route,navigation}) => {
    const {item,buyPrice,path} = route.params;
    const [token,setToken] = useState('');
    const [quantity,setQuantity] = useState('');
    const [street,setStreet] = useState('');
    const [city,setCity] = useState('');
    const [pin,setPin] = useState('');
    const [phone,setPhone] = useState('');

    useEffect(()=>{
        (async function(){
            const token = await AsyncStorage.getItem('token');
            setToken(token);
        })();
    },[])

    const formHandler = () =>{
        if(item == ""||token == "" ||quantity == "" ||street == "" ||city == ""||pin == ""||phone == ""){
            Alert.alert("All fields are required");
            return;
        }
        
        var data = JSON.stringify(
            {"itemName":item,
            "itemPrice":buyPrice,
            "itemQuantity":quantity,
            "buyerStreetLocation":street,
            "buyerCityName":city,
            "buyerPinCode":pin,
            "buyerPhoneNo":phone
        });

        var config = {
        method: 'post',
        url: ' https://krishigruha.herokuapp.com/api/buyItem',
        headers: { 
            'api_secret_key': 'dfdgh347dfnhh$$%%%%%33657667&%#$^&fdgfhgfhghgh4445yhsb@@@&*', 
            'Authorization': token, 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
            if(response.data.result == false){
                Alert.alert(response.data.msg)
                return
            }
            else{
                Alert.alert("Item bought")
                navigation.navigate('Home')
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{flex:1}} keyboardShouldPersistTaps={'handled'}>
            <Image style={styles.itemImage} source={path}/>
            <View style={styles.formContainer}>
                <Text style={{paddingLeft:10,paddingBottom:10,paddingTop:3}} h4>{item} - {buyPrice} hbar/kg</Text>
                <Input placeholder="Quantity in kg" keyboardType="numeric" value={quantity} onChangeText={(e)=> setQuantity(e)}/>
                <Input placeholder="Your Street location" value={street} onChangeText={(e)=>setStreet(e)}/>
                <Input placeholder="Your City name" value={city} onChangeText={(e)=>setCity(e)}/>
                <Input placeholder="Your PIN code" keyboardType="numeric" value={pin} onChangeText={(e)=>setPin(e)}/>
                <Input placeholder="Your Phone Number" keyboardType="numeric" value={phone} onChangeText={(e)=>setPhone(e)}/>
                <Button onPress={()=>formHandler()} buttonStyle={{backgroundColor:'green',borderRadius:30,marginLeft:9,marginRight:9}} title="BUY"/>
            </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'monospace'
    },
    itemImage:{
        width:Dimensions.get('window').width,
        height:200,
        resizeMode:'cover'
    },
    formContainer:{
        padding:15,
        backgroundColor:'white',
        paddingBottom:40
    }
})
export default buyScreen
