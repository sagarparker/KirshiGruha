import React, { useEffect,useState } from 'react'
import { View, Text, StyleSheet, Dimensions,ScrollView } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const pastOrders = ({navigation}) => {
    const[orderDetails,setOrderDetails] = useState([]);

    function apiCall(token){
        var config = {
            method: 'get',
            url: 'https://backendrn.herokuapp.com/api/getItemsSold',
            headers: { 
              'api_secret_key': 'dfdgh347dfnhh$$%%%%%33657667&%#$^&fdgfhgfhghgh4445yhsb@@@&*', 
              'Authorization': token
            },
            validateStatus:false
          };
          
          axios(config)
          .then(function (response) {
            setOrderDetails(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=>{
         ( async function(){
            const token = await AsyncStorage.getItem('token');
            console.log('use-effect - get past sell ')
            apiCall(token)
            navigation.addListener('focus', () => {
                console.log('addlistner - get past order')
                apiCall(token)
            });
        })()
    },[]);

    if(orderDetails == undefined){
        return(
            <Text style={{textAlign:'center',paddingTop:15,paddingBottom:5,fontSize:18,fontWeight:'bold',fontFamily:'monospace'}}>No items sold by you in past</Text>
        )
    }

    return (
        <View style={styles.mainContainer}>
                {
                    orderDetails[0] != undefined ? 
                    <Text style={{paddingTop:15,paddingBottom:5,paddingLeft:15,fontSize:18,fontWeight:'bold',fontFamily:'monospace'}}>
                        {"Items sold by "+orderDetails[0]?.sellerUsername}
                    </Text>
                    :
                    <Text style={{textAlign:'center',paddingTop:15,paddingBottom:5,fontSize:18,fontWeight:'bold',fontFamily:'monospace'}}>Fetching items sold</Text>
                }           
                 <ScrollView style={{flex:1,padding:15,marginBottom:70}}>
                {
                    orderDetails.map((order,index) => {
                        return(
                            <View style={styles.card} key={index}>
                            <Grid>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Product</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{fontSize:15}}>:   {order.itemName}</Text>
                                    </Col>
                   
                                </Row>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Date</Text>
                                    </Col>
                                    <Col style={{flexWrap:'wrap'}}>
                                        <Text style={{fontSize:15}}>:   {order.timestamp}</Text>
                                    </Col>
                                </Row>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Pincode</Text>
                                    </Col>
                                    <Col style={{flexWrap:'wrap'}}>
                                        <Text style={{fontSize:15}}>:   {order.sellerPinCode}</Text>
                                    </Col>
                                </Row>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Quantity</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{fontSize:15}}>:   {order.itemQuantity}/kg</Text>
                                    </Col>
                                </Row>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Item Price</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{fontSize:15}}>:   Rs.{order.itemPrice}</Text>
                                    </Col>
                                </Row>
                                <Row style={{height:37}}>
                                    <Col style={{width:80}}>
                                        <Text style={{color:"green",fontSize:15}}>Total Price</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{fontSize:15}}>:   Rs.{order.itemPrice*order.itemQuantity}</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </View>
                        )
                    }).reverse()
                }



            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        backgroundColor:'gainsboro'
    },
    card:{
        width:Dimensions.get('window').width-30,
        height:247,
        backgroundColor:'white',
        borderRadius:10,
        padding:20,
        marginBottom:20
    },
    cardText:{
        fontSize:17,
        marginBottom:8
    }
});

export default pastOrders
