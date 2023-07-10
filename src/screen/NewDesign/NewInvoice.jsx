import { View, TouchableOpacity, Text, Modal, Pressable, TextInput, Alert, FlatList, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, FONTWIEGHT, SIZES } from '../../constants/theme'
import { AuthContext } from '../../context/AuthContext'
import { ScrollView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { BASE_URL } from '../../constants/Config'
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Feather'
import axios from 'axios'

export default function NewInvoice({ navigation }) {

    const [modal, setModal] = useState(false)
    const [investor_funding_value, setInvestor_funding_value] = useState({})
    const [invoice, setInvoice] = useState([])
    const [invoiceWallet, setInvoiceWallet] = useState('')
    const { userInfo, Invoice } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [userEmail, setUserEmail] = useState('');

    const token = userInfo.data?.accessToken
    // console.log(token)
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
                    let data= cont.map((item)=>{
                        let newVal=item?.fundingGoal-item?.UnfundedValue;
                        let newVal1 = Math.round(newVal)
                         let newVal2 = (newVal /100000) 
                         let perVal = item?.fundingGoal / 100000
                         let percentage = (newVal2 / perVal) * 100
                         const finalper = Math.round(percentage)
                         const progressBar = finalper / 100
                        //  console.log( 'checking Per', finalper)
                         
                        return {
                            ...item,
                            resultValue:newVal,
                            resultValue1:newVal2,
                            resultValuePer: finalper,
                            resultValueProgress: progressBar

                        }
                    })
                    // console.log("Meraj = ",data);
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




    const handlePostAPI=()=>{
        let payload={
            "invoiceID": "1",
            "investor_funding_value" : "15000.00"
        }
         axios.post("http://192.168.5.59:9080/invoicediscounting/addfunding",
         myHeaders,payload)
         .then((res)=>{
            console.log("Responsee= ",res.data);
         }).catch((err)=>{
            console.log(err);
         })
    }

    const getData1 = () => {
        setLoading(true)
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


    // Making for progrss and Calculate in percentage

     const wallet = invoiceWallet
     const fundingGoal = invoice[0]?.fundingGoal

    // const Unfunded = invoice[0]?.UnfundedValue
    // console.log('check Goal', fundGoal)
    // console.log(UnfundGoal)

    // const fundingGoal = invoice.m

    // const x = fundingGoal - Unfunded

    // const inPerRemain = x / 100000
    const inPerUnfun = fundingGoal / 100000

    // const percentage = (inPerRemain / inPerUnfun) * 100

    // const finalper = Math.round(percentage)
    // // { percentage = x.y }
    // const progressBar = finalper / 100


    // Making the param props id

    const handleItemPress = (item) => {
        navigation.navigate('InvoiceDetails', { item });
    };

    return (

        <>
        <View style={{flex: 0.1, flexDirection:'row', justifyContent: 'flex-start', backgroundColor:'#5B5FB6'}}>
       <TouchableOpacity onPress={() => navigation.navigate('NewHome')}>
       <Icon name="home"
              size={30}
              color='white' style={{padding: 15}} />
       </TouchableOpacity>
        <Text style={{fontSize:30,color:'white', paddingTop: 5, textAlign:'center',paddingHorizontal: 80}}>Invoice</Text>
        </View>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <Spinner visible={loading} />

                <FlatList
                    keyExtractor={(item) => item.id}
                    data={invoice}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ margin: 10, marginVertical: 20 }} key={index.id}>
                                {/* <Image
                                    source={require('../../../assets/roseBackground.jpg')}
                                    style={StyleSheet.absoluteFillObject}
                                    blurRadius={80} /> */}
                                <View style={{
                                    backgroundColor: '#5B5FB6',
                                    alignItems: 'center', paddingVertical: 20
                                    , paddingHorizontal: 70
                                }} >
                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif' }}>RECOURSE ON:</Text>
                                    <Text style={{ color: 'white', fontSize: 20, fontFamily: 'san' }}>Granite America Test_</Text>
                                </View>

                                <View style={{
                                    alignItems: 'center',
                                    paddingTop: 10, borderWidth: 1, borderColor: 'grey'
                                }} >

                                    <Text style={styles.bol}>{item.discountRate} </Text>
                                    {/* <Text style={styles.bol}>70%</Text> */}
                                    <Text style={{ color: 'black', paddingBottom: 5 }}>NET ANNUAL YIELD</Text>
                                    <Text style={styles.bol}> {item.invoiceTenure} D</Text>
                                    {/* <Text style={styles.bol}> 2 D</Text> */}

                                    <Text style={{ color: 'black', paddingBottom: 5 }}> TENURE</Text>


                                    <Text style={styles.bol}>INR  {item.fundingGoal}</Text>
                                    {/* <Text style={styles.bol}> INR: 3894787</Text> */}

                                    <Text style={{ color: 'black', paddingBottom: 5 }}>FUDING GOAL</Text>
                                    <Text style={styles.bol}>INR {item.UnfundedValue}</Text>
                                    {/* <Text style={styles.bol}>INR: 7868789</Text> */}

                                    <Text style={{ color: 'black', paddingBottom: 5 }}> UNFUNDED VALUE</Text>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>Investments</Text>
                                            <Text>Rs.{item?.resultValue1}/<Text>{inPerUnfun}   </Text><Text>{item?.resultValuePer}%</Text>
                                            </Text>


                                        </View>
                                        <Progress.Bar progress={item?.resultValueProgress} width={340} />

                                        <View>

                                        </View>

                                    </View>

                                    <View style={{
                                        paddingTop: 30,
                                        flexDirection: 'row',
                                       justifyContent: 'space-between'
                                       
                                    }}>


                                        <TouchableOpacity key={item.id}
                                            onPress={() => handleItemPress(item)}
                                        >
                                            <Text style={styles.text3} >
                                                Details
                                            </Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity onPress={() => setModal(true)} >
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



                            <Text style={{ color: 'black', paddingBottom: 10, fontSize: 20, fontFamily: 'serif' }}>Wallet Net Balance:{wallet} </Text>
                            <View>


                                <View >


                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, fontFamily: 'system-ui' }}>Enter Funding Amount:</Text>
                                        <TextInput style={styles.input} type='number'
                                            placeholder='Enter the Number '
                                            />
                                    </View>
                                    <View style={styles.touch}>
                                        <TouchableOpacity>

                                            <Pressable
                                                onPress={handlePostAPI}>
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
                    </View>
                </Modal>

            </View>
            <View style={styles.footer}>
                <Text style={{
                    color: 'black', textAlign: 'center',
                    fontWeight: 'bold', paddingTop: 20, fontFamily: 'Georgia'
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
        borderWidth: 1, borderColor: 'black', padding: 10
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
        fontSize: 17,
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
        fontFamily: FONTWIEGHT.bold,
        color: COLORS.black,
        fontSize: SIZES.h3
    },
})