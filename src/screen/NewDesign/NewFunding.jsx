import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { COLORS } from '../../constants/theme';
import { Card } from 'react-native-paper';




const NewFunding = () => {

    const [fund, setFund] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
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
        fetch(`${BASE_URL}/invoicediscounting/listfundings`, requestOptions)
            .then(function (response) {
                return response.json();
            }).
            then(function (myJson) {
                let cont = myJson.data;
                //  console.log('fund check....', cont);
                setFund(cont)
                setLoading(false)
            }).catch(function (error) {
                console.log(error);
                setLoading(false)
            })

    }
    useEffect(() => {
        getData()
    }, [])

    data = [{
        "fundingRate": "13%",
        "investorFundedAmount": "100000",
        "invoicePaymentDue": "24-4-2023",
        "expectedRepaymentAmount": "Rs 1,03,136.78"
    },
    {
        "fundingRate": "17%",
        "investorFundedAmount": "200000",
        "invoicePaymentDue": "24-4-2023",
        "expectedRepaymentAmount": "Rs 1,03,136.78"
    },
    {
        "fundingRate": "13%",
        "investorFundedAmount": "300,000",
        "invoicePaymentDue": "24-4-2023",
        "expectedRepaymentAmount": "Rs 1,03,136.78"
    },
    {
        "fundingRate": "13%",
        "investorFundedAmount": "4,0889878",
        "invoicePaymentDue": "24-4-2023",
        "expectedRepaymentAmount": "Rs 1,03,136.78"
    },

    ]

    return (

        <>
            <View style={styles.container}>

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


            </View>





        </>

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