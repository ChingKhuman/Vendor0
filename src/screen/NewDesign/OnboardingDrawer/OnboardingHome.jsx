import { View, Text, RefreshControl, ToastAndroid } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-native';
import { BASE_URL } from '../../../constants/Config';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const OnboardingHome = ({navigation}) => {

    const [initialData, setInitialData] = useState({});
    const [modalVisible, setModalVisible] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { userInfo,  } = useContext(AuthContext);
    const token = userInfo.data?.accessToken;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${BASE_URL}/usermanage/nominee-check`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let res = result
            // console.log(res)    
            setInitialData(res)
        })
        .catch(error => console.log('error', error));

        const onRefresh = React.useCallback(() => {
            fetch( `${BASE_URL}/account/validate-jwt`, requestOptions)
                .then(response => response.json()
              ).then(result=>{                 
                     console.log('Check......',result)               
                    {
                                if (result.data !== null) {
                                    showToast('Session Expired.Login Again');
                                    
                                }
                                else {
                                    setModalVisible(true)
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
        };

  return (
    <>
      
      {
                initialData ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>


                            <View style={{
                                    color: 'black', fontSize: 15, textAlign: 'center', paddingTop: 10,
                                    borderWidth: 1, borderColor: 'white', backgroundColor: 'white',marginHorizontal:30
                                }}>
                                <Text style={{
                                    color: 'black', fontSize: 25, textAlign: 'center', paddingTop: 10,
                                    borderWidth: 1, borderColor: 'white', backgroundColor: 'white'
                                }}>Reminder</Text>
                                <Text style={{paddingVertical: 15, fontSize: 17, textAlign: 'center',}}>Thank you! To get started with your UpCap journey, 
                                    please complete onboarding. It will take just a few minutes</Text>


                                  <View style={{paddingVertical: 10}}>
                                  <Button onPress={() => navigation.navigate('Onboarding')} title='Ok'/>
                                  </View>
                                   <View style={{paddingBottom: 10}}>
                                   <Button onPress={()=> setModalVisible(!modalVisible)} title='Cloase'/>
                                   </View>
                            </View>
                            <View >

                               

                            </View>


                        </View>
                    </Modal> : (
                        <></>
                    )
            }

            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                <View style={{
                        backgroundColor: 'white', marginVertical: 30, borderRadius: 5,
                        marginHorizontal: 10
                    }}>

                        <View style={{
                            paddingHorizontal: 10, marginTop: 20,
                            justifyContent: 'space-between',
                        }}>
                            <Text style={styles.Text5}> YIELDS </Text>
                            <Text style={{
                                color: '#27666A', fontSize: 15,
                                marginBottom: 1, fontFamily: 'sans-serif',
                            }}> Total Yield</Text>

                            <Text style={{
                                fontSize: 13, color: '#27666A', paddingLeft: 7, paddingBottom: 10,
                                borderBottomWidth: 1, borderColor: 'grey',
                            }}>Rs. </Text>

                        </View>


                        <Text style={{ height: 25, marginVertical: 10, color: 'blue', fontFamily: 'sans-serif', textAlign: 'center' }}>  Note: The ....</Text>

                    </View>
                </View>
                {/* </View> */}


                <View style={styles.headers}>

                    <Card style={{ width: 370 }} >

                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', padding: 5, }}>Offer Counts Details</Text>
                        </View>

                    
                            <VictoryChart
                                height={250}
                                width={350}
                                theme={VictoryTheme.material}
                                domainPadding={{ x: 20 }}
                                animate={{
                                    onLoad: { duration: 1000 },
                                    duration: 1000,
                                    easing: "bounce"
                                }}
                            >
                                {/* <VictoryBar
                                    style={{
                                        data: {
                                            fill: ({ datum }) =>
                                                datum.name === 'Settled' ? 'green' :
                                                    datum.name === 'Offered' ? 'blue' :
                                                        datum.name === 'Accepted' ? '#92CDE2'
                                                            : 'violet',

                                            fillOpacity: 0.7,
                                            strokeWidth: 3
                                        },
                                        labels: {
                                            fontSize: 15,
                                            fill: ({ datum }) => datum.x === 'Settled' ? 'red' :
                                                datum.x === 'Accepted' ? 'green' :
                                                    datum.x === 'Offered' ? 'violet'
                                                        : 'blue'
                                        }
                                    }}
                                    labels={({ datum }) => datum.x}

                                    // data={pieData}
                                    // x='name'
                                    // y='allOfferCount'



                                    barRatio={0.8}
                                    animate={{
                                        onExit: {
                                            duration: 500,

                                        }
                                    }}

                                /> */}
                            </VictoryChart>
                           

{/* 
                        <View style={{
                            width: windowWidth, paddingRight: 30,
                        }}>
                            {pieData.map((item, index) => {
                                return (
                                    <>

                                        <View style={styles.View8} key={index}>
                                            <Text style={{
                                                color: item.color, fontSize: 14, paddingHorizontal: 15
                                            }}>{item.name}:</Text>

                                            <View style={{ alignItems: 'flex-end', }} >
                                                <Text style={styles.Text7}>{item.allOfferCount}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            }

                            )}

                        </View> */}

                    </Card>

                </View>
                <View style={{ marginVertical: 20, alignItems: 'center' }}>

                    <Card style={{ width: 370 }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Text style={{ color: 'black', padding: 5, fontSize: 20 }}>Offer Amount Details</Text>
                        </View>
                       

                        <View style={styles.View10}>
                           
                                <VictoryChart
                                    height={250}
                                    width={350}
                                    theme={VictoryTheme.material}
                                    domainPadding={{ x: 20 }}
                                    animate={{
                                        onLoad: { duration: 500 },
                                        duration: 500,
                                        easing: "bounce"
                                    }}
                                >
                                    {/* <VictoryBar
                                        // data={pieAData}
                                        // x='name'
                                        // y='totalOfferedAmount'
                                        style={{
                                            data: {
                                                fill: ({ datum }) =>
                                                    datum.name === 'Settled' ? 'red' :
                                                        datum.name === 'Offered' ? 'blue' :
                                                            datum.name === 'Accepted' ? '#92CDE2'
                                                                : 'green',

                                                fillOpacity: 0.7,
                                                strokeWidth: 3
                                            },
                                            labels: {
                                                fontSize: 15,
                                                fill: ({ datum }) => datum.x === 'Settled' ? 'red' :
                                                    datum.x === 'Accepted' ? 'green' :
                                                        datum.x === 'Offered' ? 'violet'
                                                            : 'blue'
                                            }
                                        }}
                                        labels={({ datum }) => datum.x} /> */}
                                    {/* <VictoryAxis/> */}
                                   
                                </VictoryChart>
                            
                           
                        </View>

                    </Card>
                </View>


                <View style={styles.footer} >

                    <Text style={{
                        color: 'black', textAlign: 'center', fontWeight: 'bold',
                        fontFamily: 'Georgia',
                        backgroundColor: "white",
                        paddingHorizontal: 35,
                        paddingVertical: 8

                    }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

                </View>
              
            </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: 300,
        shadowColor: '#000',
        shadowOffset: {
            width: 50,
            height: 40,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    },

})

export default OnboardingHome