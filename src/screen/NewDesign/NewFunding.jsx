import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button, FlatList, Image, TouchableHighlight } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { COLORS } from '../../constants/theme';
import { Card } from 'react-native-paper';
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

    const renderFooter = () => {
        return (
            loading ? 
            <View style={{marginTop:10, alignItems: 'center'}}>
                <ActivityIndicator size='large'/>
            </View>: null
                
        )
    }

    const handleLoadMore = () => {
        setPageCurrent(pageCurrent +1)
        setLoading(true)
    }
    // data = [{
    //     "fundingRate": "13%",
    //     "investorFundedAmount": "100000",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },
    // {
    //     "fundingRate": "17%",
    //     "investorFundedAmount": "200000",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },
    // {
    //     "fundingRate": "13%",
    //     "investorFundedAmount": "300,000",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },
    // {
    //     "fundingRate": "13%",
    //     "investorFundedAmount": "4,0889878",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },
    // {
    //     "fundingRate": "13%",
    //     "investorFundedAmount": "4,0889878",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },
    // {
    //     "fundingRate": "13%",
    //     "investorFundedAmount": "4,0889878",
    //     "invoicePaymentDue": "24-4-2023",
    //     "expectedRepaymentAmount": "Rs 1,03,136.78"
    // },

    // ]
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
         keyExtractor={(item, index) => item.id}
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
            const inputRange = [
                -1,
                0,
                ITEM * index,
                ITEM * (index + 2)
            ]

            const scale = scrollY.interpolate({
                inputRange:[1,1,1,1],
                outputRange:[1,1,1,1]
            })
          return  (
           <>

            <View style={{borderWidth: 1, borderColor:'blue',backgroundColor: '#5B5FB6',
        height: 70, flexDirection:'row'}}>
            <Image
            source={require('../../../assets/Logo.png')}
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
transform: [{scale}]           }}
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
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
      />
        

       
            {/* <View style={styles.container}>

                <Text style={{
                    alignItems: 'center', color: 'black', textAlign: 'center',
                    fontSize: 30, marginTop: 10
                }}> FUNDING </Text>

            </View>
            <View style={styles.headers}>
                <ScrollView>
                    <Spinner visible={loading} />

                    {fund?.map((item, index) =>


                        <View style={{ marginTop: '10%' }} key={index}>
                            <Card>
                                <View style={{
                                    backgroundColor: COLORS.green,
                                    alignItems: 'center',
                                    paddingHorizontal: 20,

                                }} >
                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif' }}>INVESTED IN:</Text>
                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'san' }}>Granite America Test_</Text>
                                </View>

                                <View style={{
                                    backgroundColor: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
                                    borderColor: 'black', borderWidth: 1
                                }}>
                                    <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                                        <Text style={{ fontFamily: 'sans-serif', fontSize: 18 }}>{item.fundingRate}</Text>


                                        <Text style={{ fontFamily: 'serif', fontSize: 13, color: 'black' }}>NET ANNUAL YIELD</Text>
                                        <Text style={{ fontFamily: 'sans-serif', fontSize: 18, color: 'black' }}>{item.investorFundedAmount}</Text>

                                        <Text style={{ fontFamily: 'serif', fontSize: 13, color: 'black' }}>YOUR INVESTMENT</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', paddingVertical: 13 }}>
                                        <Text style={{ fontFamily: 'sans-serif', fontSize: 18, color: 'black' }}>{item.invoicePaymentDue}</Text>


                                        <Text style={{ fontFamily: 'serif', fontSize: 13, color: 'black' }}>EXPECTED REPAYMENT DATE</Text>
                                        <Text style={{ fontFamily: 'sans-serif', fontSize: 18, color: 'black' }}>{item.expectedRepaymentAmount}</Text>

                                        <Text style={{ fontFamily: 'serif', fontSize: 13, color: 'black' }}>EXPECTED REPAYMENT AMOUNT</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: COLORS.green, width: 320, height: 50, alignItems: 'center' }}
                                        >
                                            <Text style={{ position: 'relative', color: COLORS.green, paddingTop: 10, fontFamily: 'serif', fontSize: 20 }} >
                                                Invoice Details
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>

                        </View>
                    )}

                    <View style={styles.footer}>
                        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

                    </View>
                </ScrollView>


            </View> */}





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