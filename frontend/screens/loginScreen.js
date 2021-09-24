import React,{useState} from 'react';
import { View,StyleSheet,Dimensions,Alert,Image,StatusBar } from 'react-native';
import { Text,Input,Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const loginScreen = ({navigation}) => {

    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const loginHandler = () =>{
        var data = JSON.stringify({"email_username":username,"password":password});

        if(username.length<=0 || password.length<=0){
            Alert.alert("Email / Username and Password cannot be empty")
            return
        }

        var config = {
        method: 'post',
        url: 'https://backendrn.herokuapp.com/api/userLogin',
        headers: { 
            'api_secret_key': 'dfdgh347dfnhh$$%%%%%33657667&%#$^&fdgfhgfhghgh4445yhsb@@@&*', 
            'Content-Type': 'application/json'
        },
        data : data,
        validateStatus:false
        };

        axios(config).then(async function (response) {
            if(response.data.error){
                Alert.alert(response.data.error)
                return
              }
              else{
                await AsyncStorage.setItem('token',response.data.token);
                navigation.replace('mainstack')
              }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  
    return (
        <View style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <Input placeholder='Email / Username' value={username} onChangeText={(e)=>setUsername(e)}/>
                <Input secureTextEntry={true} placeholder='Password' value={password} onChangeText={(e)=>setPassword(e)}/>
                <Button onPress={()=>loginHandler()} title="Login" buttonStyle={{marginLeft:10,marginRight:10,backgroundColor:'green',borderRadius:30}}/>
                <Text style={{color:'green',textAlign:'center',marginTop:25}} onPress={()=>{navigation.navigate('register')}}>New user? Register here</Text>
            </View>
            <Image style={{width:Dimensions.get('window').width,height:300,resizeMode:'contain'}} source={require('../assets/login.jpg')}/>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        backgroundColor:'#fff'
    },
    formContainer:{
        height:340,
        paddingTop:50,
        paddingHorizontal:30
    }
})

export default loginScreen
