import { View,TouchableOpacity, Text, Modal, Pressable, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, FONTWIEGHT, SIZES } from '../../constants/theme'
import { AuthContext } from '../../context/AuthContext'
import { ScrollView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { BASE_URL } from '../../constants/Config'

export default function NewInvoice({navigation}) {

    const [modal, setModal] = useState(false)
    const [add, setAdd] = useState({})
    const [invoice, setInvoice] = useState([])
    const { userInfo, Invoice } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false)

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
                // console.log("check Invoice", cont)
                if (myJson.data === null) {
                    Alert.alert('Thank you for interest Right now we found nothing data , Will notify you ,.')
                }
                else { setInvoice(cont) }
                setLoading(false)

            }).catch(function (error) {
                console.log(error)
                setLoading(false)
            })

    }
    React.useEffect(() => {
        getData()
    }, [])



    return (

        <>

            <View style={styles.container}>
               
            </View>
            <View style={styles.headers}>
            <Text style={{color: 'black', fontSize: 20, borderWidth: 1, borderColor: 'black', 
            backgroundColor: 'grey', marginTop: 10}}>INVOICE MANAGEMENT SYSTEM</Text>
            <ScrollView horizontal={true} style={{}}>
               
                <Spinner visible={loading} />
           
                {invoice.map((item, index) =>
          
              <View style={styles.view1}  >
                            <View style={{
                                backgroundColor: COLORS.green,
                                alignItems: 'center', paddingVertical: 20
                            }} >
                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'serif' }}>RECOURSE ON:</Text>
                                <Text style={{ color: 'white', fontSize: 20, fontFamily: 'san' }}>Granite America Test_</Text>
                            </View>
                            
                            <View style={{ alignItems: 'center', paddingTop: 10, borderWidth:1, borderColor: 'black' }} >
                                
                                <Text style={styles.bol}>{item.discountRate} </Text>
                                {/* <Text style={styles.bol}>70%</Text> */}
                                <Text style={{ color: 'black' }}>NET ANNUAL YIELD</Text>
                                <Text style={styles.bol}> {item.invoiceTenure} D</Text>
                                {/* <Text style={styles.bol}> 2 D</Text> */}
                               
                                <Text style={{ color: 'black' }}> TENURE</Text>

                                <View style={{
                                    paddingVertical: 20, alignItems: 'center'
                                }}>
                                    <Text style={styles.bol}>INR  {item.fundingGoal}</Text>
                                    {/* <Text style={styles.bol}> INR: 3894787</Text> */}
                                  
                                    <Text>FUDING GOAL</Text>
                                    <Text style={styles.bol}>INR   {item.unfundedValue}</Text>
                                    {/* <Text style={styles.bol}>INR: 7868789</Text> */}
                                   
                                    <Text> UNFUNDED VALUE</Text>
                                </View>

                                <View style={{ alignItems: 'center', paddingTop: 30, flexDirection: 'row' }}>
                                <View style={{ paddingVertical: 5,paddingHorizontal: 80, }}>
                                    <TouchableOpacity style={styles.touchable1}>
                                        <Text style={styles.text3} >
                                            Details
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ paddingVertical: 5,paddingHorizontal: 80 }}>
                                    <TouchableOpacity onPress={() => setModal(true)} style={styles.touchable1}>
                                        <Text style={styles.text3} >
                                            Fund
                                        </Text>
                                    </TouchableOpacity>
                                
                                </View>
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



                                            <Text style={{ color: 'black', paddingBottom: 10, fontSize: 20, fontFamily: 'serif' }}>Wallet Net Balance: </Text>
                                            <View>


                                                <View >


                                                    <View>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, fontFamily: 'system-ui' }}>Enter Funding Amount:</Text>
                                                        <TextInput style={styles.input}  type='number'
                                                            placeholder='Enter the Number '
                                                            onChangeText={number => setAdd(number)} />
                                                    </View>
                                                    <View style={styles.touch}>
                                                        <TouchableOpacity>
                                                            <Pressable
                                                                onPress={() => setModal(!modal)}>
                                                                <Text style={styles.textStyle}>Close</Text>
                                                            </Pressable>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>

                                                            <Pressable
                                                                onPress={Invoice}>
                                                                <Text style={styles.textStyle1}>Add Funding</Text>
                                                            </Pressable>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>

                            </View>
                            </View>
 
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between'
                                , padding: 20
                            }}>
                                {/* <Text style={styles.text}>Investment</Text> */}
                                {/* <Text style={styles.text1}>Rs {value} </Text> */}

                            </View>
                            <View style={{ alignItems: 'flex-start', paddingStart: 20 }}>
                                {/* < Progress.Bar progress={0.5} width={100} /> */}
                            </View>
                            {/* <View onLayout={onLayout} />
                            */}
                           
                         

              </View>
               )} 
           
            </ScrollView>           
            </View>

            <View style={styles.footer}>
            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: 20, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>


            </View>       

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.0,
        backgroundColor: 'green'
    },
    headers: {
        flex: 11,
        alignItems: 'center',
        
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'black'
    },
    footer: {
        flex: 1,
        alignItems: 'center',

    },
    view1: {
       borderRadius:20,
        margin: 50,
        width: '55%',
        borderRadius: 3,
        height: 100  ,
   },
   text3: { color: 'green', paddingTop: 7,
borderWidth:1, borderColor: 'black', padding: 10 },
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