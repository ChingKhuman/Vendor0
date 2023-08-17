import { View, TouchableOpacity, Text, Modal, Pressable, TextInput, Alert, FlatList, Image, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, FONTWIEGHT, SIZES } from '../../constants/theme'
import { AuthContext } from '../../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import { BASE_URL } from '../../constants/Config'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import { DigioRNComponent } from 'digio-sdk-rn'

import { RefreshControl } from 'react-native'
import { ToastAndroid } from 'react-native'
import { WebView } from 'react-native-webview'




export default function NewInvoice({ navigation }) {

    const [modal, setModal] = useState(false)
    const [modal1, setmodal1] = useState(false)
    const [modal2, setmodal2] = useState(false)
    const [invoice, setInvoice] = useState([])
    const [invoiceWallet, setInvoiceWallet] = useState('')
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [investor_funding_value, setInvestor_funding_value] = useState('')
    const [invoiceID, setInvoiceId] = useState(null);
    const [fundResponse, setfundResponse] = useState("")
    const [refreshing, setRefreshing] = useState(false);


    const [url, setUrl] = useState(null);
    // Function to initiate Digio payment flow
    const token = userInfo.data?.accessToken


    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const onRefresh = React.useCallback(() => {
        fetch(`${BASE_URL}/account/validate-jwt`, requestOptions)
            .then(response => response.json()
            ).then(result => {
                console.log('Check......', result)
                {
                    if (result.data === null) {
                        showToast('Session Expired.Login Again');

                    }
                    else {
                        setRefreshing(true);
                        setTimeout(() => {
                            setRefreshing(false);

                        }, 2000);
                    }
                }
            })
            .catch(function (error) {
                console.warn('Request failed', error)

            })
    }, []);
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    }


    const getData = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${BASE_URL}/invoicediscounting/invoice`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson.data;
                //   console.log("check Invoice", cont)
                if (cont == null) {
                    Alert.alert('Thank you for interest Right now we found nothing data , Will notify you ,.')
                }
                else {
                    let data = cont.map((item) => {

                        let invoiceId1 = item?._invoiceID
                        // console.log('cldkjfldkjfdlfjdlfjdklfj', invoiceId1)                   
                        let newVal = item?.fundingGoal - item?.UnfundedValue;
                        let newVal1 = Math.round(newVal)
                        let newVal2 = (newVal / 100000)
                        let perVal = item?.fundingGoal / 100000
                        let percentage = (newVal2 / perVal) * 100
                        const finalper = Math.round(percentage)
                        const progressBar = finalper / 100
                        //  console.log( 'checking Per', finalper)

                        return {
                            ...item,
                            resultValue: newVal,
                            resultValue1: newVal2,
                            resultValuePer: finalper,
                            resultValueProgress: progressBar,
                            resultValueInvoiceId: invoiceId1

                        }
                    })

                    setInvoice(data)
                }
                setLoading(false)

            }).catch(function (error) {
                console.log(error)
                setLoading(false)
            })

    }
    useEffect(() => {
        getData()
    }, []);



    const getData1 = () => {
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${BASE_URL}/wallet/wallet-balance`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson.data.finvridhhiWallet.afterOfferDeduct;
                //    console.log("check Invoice Wallet", cont)
                setInvoiceWallet(cont)
                setLoading(false)
            }).catch(function (error) {
                console.log(error)
                setLoading(false)
            })

    }
    useEffect(() => {
        getData1()
    }, [])

    const InvoiceFund = async () => {
        const token1 = userInfo.data?.accessToken;
        const raw = JSON.stringify({
            "invoiceID": invoiceID,
            "investor_funding_value": investor_funding_value,
            // "submissiobn_type": 0,

        })

        //   console.log('cehckckfkhlk', invoiceID)


        const requestOptions1 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',  // I added this line
                "Authorization": token1
            },
            body: raw,
        }
        fetch(`${BASE_URL}/invoicediscounting/addfunding`, requestOptions1)
            .then(response => response.json())
            .then((result) =>            
            {
                let results = result
                //  console.log('check...........', results)
                if (results?.code === 200) {
                    setmodal1(true)
                    setfundResponse(results)
                }
                else if (result?.code === 600) {
                    Alert.alert('Minimum funding amount should be INR 0"')

                }
                else if (result?.code === 500) {
                    Alert.alert('Minimum funding amount should be INR 0"')

                } else {
                    Alert.alert('Fill not be blaank')
                    // console.log(result)

                }
            }
            )
            .catch(error => console.log('error', error));
    }


    const WalletCallback = async () => {
        const token1 = userInfo.data?.accessToken;
        const raw = JSON.stringify({
            "invoiceID": invoiceID,
            "investor_funding_value": investor_funding_value,
            // "submissiobn_type": 0,

        })

        //   console.log('cehckckfkhlk', invoiceID)


        const requestOptions1 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',  // I added this line
                "Authorization": token1
            },
            body: raw,
        }
        fetch(`${BASE_URL}/invoicediscounting/addfunding`, requestOptions1)
            .then(response => response.json())
            .then((result) =>
            // console.log(result)
            {
                let results = result
                console.log('check...........', results)
                if (results?.code === 200) {

                    setmodal1(true)
                    setfundResponse(results)

                }
                else if (result?.code === 600) {
                    Alert.alert('Minimum funding amount should be INR 0"')

                }
                else if (result?.code === 500) {
                    Alert.alert('Minimum funding amount should be INR 0"')

                } else {
                    Alert.alert('Fill not be blaank')
                    // console.log(result)

                }
            }
            )
            .catch(error => console.log('error', error));
    }




    // Making for progrss and Calculate in percentage

    const wallet = invoiceWallet
    const fundingGoal = invoice[0]?.fundingGoal
    const inPerUnfun = fundingGoal / 100000

    const handleItemPress = (item) => {
        navigation.navigate('InvoiceDetails', { item });
    };



    //-------------------DigiLog start






    const digiID = fundResponse?.data?.kyc_ID
    const digioUserIdentifiervalue = fundResponse?.data?.customer_identifier
    const digiToken = fundResponse?.data?.access_token



    const [digioDocumentId, setDigioDocumentId] = useState(digiID);
    const [digioUserIdentifier, setDigioUserIdentifier] = useState(digioUserIdentifiervalue);
    const [digioLoginToken, setDigioLoginToken] = useState(digiToken);

    const [webViewLoaded, setWebViewLoaded] = useState(false);
    // const [options, setOptions] = useState({
    //   "environment": "sandbox",
    // //   "logo": "yourlogourl",
    // //   "theme": {
    // //     "primaryColor": "#234FDA", // < 6 char color hex code only e.g. #234FDA, used for background
    // //     "secondaryColor": "#234FDA", // < 6 char color hex code only e.g. #234FDA, used for font color
    // //   },
    // });



    // const options={
    //     environment:'sandbox',
    //     callback:function(response){
    //       if(response.hasOwnProperty('error_code')){
    //         return console.log(response)
    //       }
    //       console.log(response);
    //       let request ={
    //         'invoiceID' : invoiceID,
    //         'digio_doc_id': response.digio_doc_id,
    //         'txn_id': response.txn_id
    //       }
    //       const signRequest = api.walletSign;
    //       fetch(`${BASE_URL}/walletSign`,{
    //         method:"POST",
    //         headers:{
    //           "content-type":"application/json",
    //           Authorization:userInfo?.code.accessToken
    //         },
    //         body:JSON.stringify(request)
    //       })
    //       .then((response)=>response.json())
    //       .then((result)=>{
    //         console.log(JSON.stringify(result))
    //         if(result.code === 500){
    //           Alert.alert("Agreement Signing",result.message,pic)
    //         }else{
    //           Alert.alert("Agreement Signing",result.message,pic)
    //         //   .then((okClicked)=>{
    //         //     if(okClicked){
    //         //       window.location.reload();
    //         //     }
    //         //   })
    //         }
           
    //       })
    //     },
    //     logo: 'https://finsightventures.in/upcap/assets/dist/img/Logo.png',
    //     theme: {
    //         primaryColor: '#AB3498',
    //         secondaryColor: '#000000'
    //     }
    //   }
    //   const digio = new Digio(options);
    //   digio.init();
    //   digio.submit(digiID,digioUserIdentifiervalue,digiToken);
    //   setTimeout(function () {
    //     setLoading(true)
    // }, 1000);
    

 
    // const digio = new Digio(options);
    // digio.init();
    // digio.submit(did, didEmail, didAccess);

    // const onSuccess = (t) => {

    //     console.log(t + " Response from Digio SDK ");
    // }

    // const onCancel = () => {
    //     console.log("Cancel Response from Digio SDK ");
    // }








    //--------Digilog Submission






    return (

        <>
            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#5B5FB6' }}>
                <TouchableOpacity onPress={() => navigation.navigate('NewHome')}>
                    <Icon name="home"
                        size={30}
                        color='white' style={{ padding: 15 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 30, color: 'white', paddingTop: 5, textAlign: 'center',
                    paddingHorizontal: 80, fontFamily: 'Calibri-Regular',
                }}>Invoice</Text>
                <TouchableOpacity onPress={() => navigation.navigate('WalletReport')}>
                    <Icon1 name="report"
                        size={30}
                        color='white' style={{ padding: 15 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <Spinner visible={loading} />

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={(item) => item._invoiceID}
                    data={invoice}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ margin: 10, marginVertical: 20 }} key={index}>
                                {/* <Image
                                    source={require('../../../assets/roseBackground.jpg')}
                                    style={StyleSheet.absoluteFillObject}
                                    blurRadius={80} /> */}
                                <View style={{
                                    backgroundColor: COLORS.green,
                                    alignItems: 'center', paddingVertical: 20
                                    , paddingHorizontal: 70
                                }} >
                                    <Text style={{ color: 'white', fontSize: 20, ontFamily: 'Calibri-Regular', }}>RECOURSE ON:</Text>
                                    <Text style={{ color: 'white', fontSize: 20, ontFamily: 'Calibri-Regular', }}>Granite America Test_</Text>
                                </View>

                                <View style={{
                                    alignItems: 'center',
                                    paddingTop: 10, borderWidth: 1, borderColor: 'grey'
                                }} >

                                    <Text style={styles.bol}>{item.discountRate} </Text>

                                    <Text style={{ color: 'black', paddingBottom: 5, ontFamily: 'Calibri-Regular', }}>NET ANNUAL YIELD</Text>
                                    <Text style={styles.bol}> {item.invoiceTenure} D</Text>


                                    <Text style={{ color: 'black', paddingBottom: 5, ontFamily: 'Calibri-Regular', }}> TENURE</Text>


                                    <Text style={styles.bol}>INR  {item.fundingGoal}</Text>


                                    <Text style={{ color: 'black', paddingBottom: 5, fontFamily: 'Calibri-Regular', }}>FUDING GOAL</Text>
                                    <Text style={styles.bol}>INR {item.UnfundedValue}</Text>


                                    <Text style={{ color: 'black', paddingBottom: 5, fontFamily: 'Calibri-Regular', }}> UNFUNDED VALUE</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Investments</Text>
                                            <Text>Rs.{item?.resultValue1}/<Text>{inPerUnfun}   </Text><Text>{item?.resultValuePer}%</Text>
                                            </Text>


                                        </View>
                                        <Progress.Bar progress={item?.resultValueProgress} width={340} />



                                    </View>

                                    <View style={{
                                        paddingTop: 30,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                        

                                    }}>


                                        <TouchableOpacity style={{marginHorizontal:30, marginBottom: 10}} key={item.id}
                                            onPress={() => handleItemPress(item)}
                                        >
                                            <Text style={styles.text3} >
                                                Details
                                            </Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={{marginHorizontal:30,marginBottom: 10}} onPress={() => {
                                            setModal(true);
                                            setInvoiceId(item._invoiceID)
                                        }} >
                                            <Text style={styles.text3} >
                                                Fund
                                            </Text>
                                        </TouchableOpacity>


                                    </View>


                                </View>
                            </View>
                        )
                    }} />


                <Modal
                    backdropOpacity={0.3}

                    animationType="fade"
                    transparent
                    visible={modal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModal(!modal);
                    }}>
                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Funding</Text>



                            <Text style={{ color: 'black', paddingBottom: 10, fontSize: 20, fontFamily: 'Calibri-Regular', }}>Wallet Net Balance:{wallet} </Text>



                            <View >


                                <View>
                                    <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Calibri-bold', }}>Enter Funding Amount:</Text>
                                    <TextInput style={styles.input} type='number'
                                        placeholder='Enter the Number '
                                        value={investor_funding_value}
                                        onChangeText={text => setInvestor_funding_value(text)}
                                    />
                                </View>
                                <View style={styles.touch}>
                                    <TouchableOpacity  >
                                        <Pressable onPress={InvoiceFund}
                                        >
                                            <Text style={styles.textStyle}>Add Funding</Text>
                                        </Pressable>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Pressable
                                            onPress={() => setModal(!modal)}>
                                            <Text style={styles.textStyle}>Close</Text>
                                        </Pressable>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>

                <Modal
                    backdropOpacity={0.3}
                    animationType="fade"
                    transparent
                    visible={modal1}
                    onRequestClose={() => {
                        setmodal1(!modal1)
                    }}>
                    <View style={styles.centeredView}>


                        <View style={styles.modalView}>
                            <Text style={{ paddingVertical: 30, color: 'black', fontSize: 20, fontFamily: 'Calibri-Regular', }}>Please click the button to complete your funding.</Text>

                            <Button title='Ok' onPress={() => setmodal2(true)} />
                            <Button title='Go Back' onPress={() => setmodal1(false)} />

                        </View>
                    </View>
                </Modal>
                <Modal
                    backdropOpacity={0.3}
                    animationType="fade"
                    transparent
                    visible={modal2}
                    onRequestClose={() => {
                        setmodal2(!modal2)
                    }}>
                    <View style={styles.centeredView}>


                        <View style={styles.modalView}>
                            <Text style={{ paddingVertical: 30, color: 'black', fontSize: 20, fontFamily: 'Calibri-Regular', }}>Please Confirm.</Text>

                            <Button title='Ok' onPress={() => setmodal2(false)} />
                            <Button title='Go Back' onPress={() => setmodal2(false)} />

                           
{/* 
                            <DigioRNComponent
                                onSuccess={onSuccess}
                                // onCancel={onCancel}
                                options={options}
                                digioDocumentId={digioDocumentId}
                                identifier={digioUserIdentifier}
                                digioToken={digioLoginToken}
                            /> */}

                        </View>
                    </View>
                </Modal>

            </View>
            <View style={styles.footer}>
                <Text style={{
                    color: 'black', textAlign: 'center',
                    fontWeight: 'bold', paddingTop: 20, fontFamily: 'Calibri-Regular',
                }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.0,

    },
    headers: {
        flex: 9,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black'
    },
    footer: {
        flex: 0,
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: 'white'


    },

    text3: {
        color: 'green', paddingTop: 7,
        borderWidth: 1, borderColor: 'black', padding: 10,
        fontFamily: 'Calibri-Regular',

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: 350,

        shadowColor: '#000',
        shadowOffset: {
            width: 50,
            height: 2,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    },
    textStyle: {
        fontFamily: 'Calibri-Regular',
        color: 'black',
        backgroundColor: 'orange',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        paddingVertical: 17,
        borderRadius: 5

    },
    bol: {
        fontFamily: 'Calibri-Regular',
        color: COLORS.black,
        fontSize: SIZES.h3
    },
})