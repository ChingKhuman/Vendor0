import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button, FlatList, Image, TouchableHighlight } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { StatusBar } from 'react-native';
import { Animated } from 'react-native';
import { useRef } from 'react';
import { ActivityIndicator } from 'react-native';
;




const NewFunding = () => {

    const [fund, setFund] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [pageCurrent, setPageCurrent] = useState(1)
    

    // console.log(userInfo)
    const token = userInfo.data?.accessToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const getData = () => {
        setLoading(true)
        fetch(`${BASE_URL}/invoicediscounting/listfundings?_limit=2&_page=` + pageCurrent, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson.data;
                //   console.log('fund check....', cont);
                setFund(cont)
                setLoading(false)
            }).catch(function (error) {
                console.log(error);
                setLoading(false)
            })

    }
    useEffect(() => {
        getData()
        setLoading(true)
        return () => {

        }
    }, [pageCurrent])

  
  
     const SPACING = 20
     const AVATAR = 70
     const ITEM = AVATAR + SPACING *3
 
     const scrollY = useRef(new Animated.Value(0)).current;
    return (
        
        <View style={{flex:1, backgroundColor: '#fff'}}> 
        <Image 
        source={require('../../../assets/roseBackground.jpg')}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}/>
       

        <Animated.FlatList
         keyExtractor={(item) => item.id}
        data={fund}
        onScroll={Animated.event(
            [{nativeEvent: {contentOffset:{y:scrollY}}}],
            {useNativeDriver:true}
        )}
        contentContainerStyle={{
            padding:20,
            paddingTop:StatusBar.currentHeight ||42
        }}
        renderItem={({ item, index }) => {
           
          return  (
           <>

            <View style={{borderWidth: 1, borderColor:'blue',backgroundColor: '#5B5FB6',
        height: 70, flexDirection:'row'}} key={index}>
            <Image
            source={require('../../../assets/Logo.jpg')}
            style={{width: 80,height: 35 , borderRadius: 100, 
            margin: 5, marginVertical: 15}}/>
            <View>
                <Text style={{color: 'white', textAlign: 'center',fontSize: 20,paddingStart: 50 }}>Invested: </Text>
                <Text style={{color: 'white', textAlign: 'center',fontSize: 20,paddingStart: 50}}>{item.anchor}</Text>
                </View></View>
            <Animated.View style={{padding: 10, marginBottom: 20,
            backgroundColor:'rgba(255,255,255,0.8)',borderBottomEndRadius:12,
            borderBottomLeftRadius:12,
             shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height:10
            },
        shadowOpacity: .3,
    shadowRadius: 20,
          }}
                    >

            {/* <Image
            source={require('../../../assets/Logo.png')}
            style={{width: 80,height: 35 , borderRadius: 100, margin: 10,
            marginStart: 20}}/>
            */}
           
            <View style={{alignItems: 'center'}}>
                
              <Text style={{textAlign: 'center',fontSize: 20, opacity:.7, fontWeight:700,}}>{item.fundingRate}</Text>
              <Text style={{color: 'black',textAlign: 'center',paddingBottom: 10}}>NET ANNULA YIELD</Text>
              <Text style={{fontSize:20, opacity:.7, textAlign: 'center'}}>{item.investorFundedAmount}</Text>
              <Text style={{color: 'black',textAlign: 'center',paddingBottom: 10}}>YOUR INVESTMENT</Text>
              <Text style={{fontSize:20, opacity:.8, textAlign: 'center'}}>{item.invoicePaymentDue}</Text>
              <Text style={{color: 'black',textAlign: 'center',paddingBottom: 10,}}>EXPECTED REPAYMENT DATE</Text>
              <Text style={{fontSize:20, opacity:.7, textAlign:'center'}}>{item.expectedRepaymentAmount}</Text>
              <Text style={{color: 'black',textAlign: 'center',paddingBottom: 10}}>EXPECTED REPAYMENT AMOUNT</Text>
           
              <TouchableHighlight style={{borderWidth:1,borderColor:'green', 
            alignItems: 'center',  marginTop:20,}}>
                <Text style={{color: 'green',textAlign:'center',padding:5}}>Investment Notes</Text></TouchableHighlight>
            </View>

            
              </Animated.View>
            </>              
          )     
        }}
       
      />
                </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headers: {
        flex: 9,
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    footer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',



    }
})
export default NewFunding;