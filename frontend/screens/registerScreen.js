import React,{useState} from 'react';
import { View,StyleSheet,Dimensions,Alert,Image,StatusBar } from 'react-native';
import { Text,Input,Button } from 'react-native-elements';
import axios from 'axios';

const registerScreen = ({navigation}) => {
    const[email,setEmail]       =   useState("");
    const[username,setUsername] =   useState("");
    const[password,setPassword] =   useState(""); 

    const registerHandler = () =>{

        function validateEmail(email){
                var re = /\S+@\S+\.\S+/;
                return re.test(email);
        }

        if(username.length<=0 || email.length<=0){
            Alert.alert("Email and Username cannot be empty")
            return
        }

        if(password.length<=0){
            Alert.alert("Password cannot be empty")
            return
        }
            
        if(!validateEmail(email)){
            Alert.alert("Please enter a valid Email")
            return
        }

        var data = JSON.stringify({"email":email,"username":username,"password":password});

        var config = {
        method: 'post',
        url: 'https://backendrn.herokuapp.com/api/userRegister',
        headers: { 
            'api_secret_key': 'dfdgh347dfnhh$$%%%%%33657667&%#$^&fdgfhgfhghgh4445yhsb@@@&*', 
            'Content-Type': 'application/json'
        },
            data : data,
        validateStatus:false
        };

        axios(config)
        .then(function (response) {
            if(response.data.error){
                Alert.alert(response.data.error)
                return
            }
            else{
                Alert.alert("Account created")
                navigation.navigate('login')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  
    return (
        <View style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <Input placeholder='Email' value={email} onChangeText={(e)=>setEmail(e)}/>
                <Input placeholder='Username' value={username} onChangeText={(e)=>setUsername(e)}/>
                <Input secureTextEntry={true} value={password} placeholder='Password' onChangeText={(e)=>setPassword(e)}/>
                <Button title="Register" onPress={()=>{registerHandler()}} buttonStyle={{marginLeft:10,marginRight:10,backgroundColor:'green',borderRadius:30}}/>
                <Text style={{color:'green',textAlign:'center',marginTop:25}} onPress={()=>{navigation.navigate('login')}}>Already have an account? Login here</Text>
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
        height:350,
        paddingTop:30,
        paddingHorizontal:30
    }
})

export default registerScreen
