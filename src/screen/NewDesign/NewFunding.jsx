import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button, FlatList, Image, TouchableHighlight, TextInput, SafeAreaView } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import { StatusBar } from 'react-native';
import { Animated } from 'react-native';
import { useRef } from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';




const NewFunding = () => {

    const [fund, setFund] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [pageCurrent, setPageCurrent] = useState(1)
    const [searchQuery, setSearchQuery] = useState('');
    const [pdfFilePath, setPdfFilePath] = useState('');


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
        setLoading(true)
        return () => {

        }
    }, [pageCurrent])
    const SPACING = 20
    const AVATAR = 70
    const ITEM = AVATAR + SPACING * 3

    const scrollY = useRef(new Animated.Value(0)).current;

    //------Search------------------------

    const filteredData = fund?.filter(item =>
        item.anchor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //-------------------Download--------------------
    const generatePDF = async () => {
        // Step 2: Generate HTML content
        const htmlContent = `
      <html>
        <body style={{padding: 40}}>
          <table>
            <thead>
              <tr>
                <th>Funding Rate</th>
                <th>Funding Amount</th>
                <th>Payment DUe</th>
                <th>Expected Repayment Amount</th>
              </tr>
            </thead>
            <tbody>
              ${fund
                .map(
                    (row) => `
                  <tr>
                    <td>${row.fundingRate}</td>
                    <td>${row.investorFundedAmount}</td>
                    <td>${row.invoicePaymentDue}</td>
                    <td>${row.expectedRepaymentAmount}</td>
                  </tr>
                `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

        try {
            // Step 3: Generate and save PDF file
            const { filePath } = await RNHTMLtoPDF.convert({
                html: htmlContent,
                fileName: 'table_Fund_data',
                directory: 'Documents',
            });
            setPdfFilePath(filePath);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const downloadPDF = async () => {
        try {
            // Step 4: Move PDF file to public directory
            const destinationPath = `${RNFS.DocumentDirectoryPath}/table_Fund_data.pdf`;
            await RNFS.moveFile(pdfFilePath, destinationPath);

            // Step 5: Share or download the PDF file
            const shareOptions = {
                title: 'Fund Data PDF',
                url: `file://${destinationPath}`,
                type: 'application/pdf',
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            Alert.alert('Error', 'Failed to download PDF');
        }
    };


    return (

        <ScrollView
            style={{
                flex: 1,
                //  backgroundColor: '#fff'
            }}>


            <Image
                source={require('../../../assets/roseBackground.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80} />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        
    <Text style={{paddingHorizontal: 8,color:'grey',textAlign:'left', fontSize:15, paddingVertical: 10}}>Home/ Funding</Text>
         <View style={{ marginHorizontal: 20,marginVertical:5, flexDirection:'row', justifyContent:'space-between' }}>
                <Button title="Generate PDF" onPress={generatePDF} />
                {/* <TouchableOpacity  >
                   <Text> Generate PDF</Text>
                </TouchableOpacity> */}
                {pdfFilePath !== '' && (
                    <Button title="Download PDF" onPress={downloadPDF} />
                )}
            </View>
    </View>
           <Card style={{margin:8, }}>
           {/* <LinearGradient
        //   start={{x: 1, y: 1}}
        //   end={{x: 1, y: 0}}
           colors={['#CFD8F6', '#D7F6A9', '#192f6a']}
        //   style={styles.linearGradient}
         > */}
           <TextInput
                style={{ color: 'green', borderWidth: 1, borderColor: 'black', marginHorizontal: 20, marginTop: 10,
            borderRadius:8 }}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
 {/* </LinearGradient> */}
           
         
          
           </Card>
          
            <Animated.FlatList
                keyExtractor={(item) => item.id}
                data={filteredData}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                contentContainerStyle={{
                    padding: 20,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                renderItem={({ item, index }) => {

                    return (
                        <SafeAreaView>

                            <View style={{
                                borderWidth: 1, borderColor: 'blue', backgroundColor: '#5B5FB6',
                                height: 70, flexDirection: 'row'
                            }} key={index}>
                                <Image
                                    source={require('../../../assets/Logo.jpg')}
                                    style={{
                                        width: 80, height: 35, borderRadius: 100,
                                        margin: 5, marginVertical: 15
                                    }} />
                                <View style={{paddingRight: 25}}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, paddingRight: 20, fontFamily:'Calibri-bold', }}>Invested: </Text>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, paddingStart: 20, fontFamily:'Calibri-bold', }}>{item.anchor}</Text>
                                </View></View>
                            <Animated.View style={{
                                padding: 10, marginBottom: 20,
                                backgroundColor: 'rgba(255,255,255,0.8)', borderBottomEndRadius: 12,
                                borderBottomLeftRadius: 12,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 10
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

                                <View style={{ alignItems: 'center' }}>

                                    <Text style={{ textAlign: 'center', fontSize: 20, opacity: .7,  fontFamily:'Calibri-bold', }}>{item.fundingRate}</Text>
                                    <Text style={{ color: 'black', textAlign: 'center', paddingBottom: 10, fontFamily:'Calibri-Regular', }}>NET ANNULA YIELD</Text>
                                    <Text style={{ fontSize: 20, opacity: .7, textAlign: 'center', fontFamily:'Calibri-Regular', }}>{item.investorFundedAmount}</Text>
                                    <Text style={{ color: 'black', textAlign: 'center', paddingBottom: 10, fontFamily:'Calibri-Regular', }}>YOUR INVESTMENT</Text>
                                    <Text style={{ fontSize: 20, opacity: .8, textAlign: 'center', fontFamily:'Calibri-Regular', }}>{item.invoicePaymentDue}</Text>
                                    <Text style={{ color: 'black', textAlign: 'center', paddingBottom: 10, fontFamily:'Calibri-Regular', }}>EXPECTED REPAYMENT DATE</Text>
                                    <Text style={{ fontSize: 20, opacity: .7, textAlign: 'center', fontFamily:'Calibri-Regular', }}>{item.expectedRepaymentAmount}</Text>
                                    <Text style={{ color: 'black', textAlign: 'center', paddingBottom: 10, fontFamily:'Calibri-Regular', }}>EXPECTED REPAYMENT AMOUNT</Text>

                                    <TouchableHighlight style={{
                                        borderWidth: 1, borderColor: 'green',
                                        alignItems: 'center', marginTop: 20,
                                    }}>
                                        <Text style={{ color: 'green', textAlign: 'center', padding: 5, fontFamily:'Calibri-Regular', }}>Investment Notes</Text></TouchableHighlight>
                                </View>


                            </Animated.View>
                        </SafeAreaView>
                    )
                }}

            />
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    linearGradient: {
       
      
      
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