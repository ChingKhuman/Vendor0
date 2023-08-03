import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { BASE_URL } from '../../../constants/Config';
import { Card } from 'react-native-paper';
import { Alert } from 'react-native';
  import { DigioRNComponent } from 'digio-sdk-rn';
 

const Onboarding = () => {
   

    const digioApiBaseUrl = 'https://ext.digio.in/sdk/v11/digio.js'

    const { userInfo,  } = useContext(AuthContext);
    const token = userInfo.data?.accessToken;

    const [initialData, setInitialData] = useState('');
    const [tracker, settracker] = useState('')
    const [modalVisible, setModalVisible] = useState(true);
    const [step, setstep] = useState("")

   

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${BASE_URL}/onboard/tracking`, requestOptions)
        .then(response => response.json())
        .then(result => {
            let res = result
            //   console.log('check tracker status',res)    
            settracker(res)
          
        })
        .catch(error => console.log('error', error));

        //--------------------begin onboarding
        
    const OnboardingBegin = async () => {
        var raw = JSON.stringify({
            "step": step
        })
        const requestOptions1 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',  // I added this line
                "Authorization": token
            },
            body: raw,
        }
            fetch(`${BASE_URL}/onboard/digiokycrequest`, requestOptions1)
                .then(response => response.json())
                .then((result) =>       
                
             
                      { 
                        let results = result
                        console.log(result) 
                 if  ( results.code === 200 )
                 {
                    Alert.alert('OK')
                  
                    setInitialData(result)
                    setModalVisible(!modalVisible)
                  
                 }  else{
                    Alert.alert('Something went wrong')          
                      }   }    )     

                .catch(error => console.log('error', error));    
                }    
                
        const digiID = initialData?.data?.kyc_ID
        const digioUserIdentifiervalue = initialData?.data?.customer_identifier
        const digiToken = initialData?.data?.access_token

       
          
  const [digioDocumentId, setDigioDocumentId] = useState(digiID);
  const [digioUserIdentifier, setDigioUserIdentifier] = useState(digioUserIdentifiervalue);
  const [digioLoginToken, setDigioLoginToken] = useState(digiToken);
  const options = {
    environment: 'sandbox',
    logo: 'https://finsightventures.in/upcap/assets/dist/img/Logo.png',
    theme: {
        primaryColor: '#AB3498',
        secondaryColor: '#000000'
    }
  };

//   const options = {
//     environment: 'sandbox',
//     logo: 'https://finsightventures.in/upcap/assets/dist/img/Logo.png',
//     theme: {
//         primaryColor: '#AB3498',
//         secondaryColor: '#000000'
//     },
//   };

  const onSuccess = (t) => {
   setDigioDocumentId(t)
   setDigioUserIdentifier(t)
   setDigioLoginToken(t)
    console.log(t + ' Response from Digio SDk ');
  };

  const onCancel = () => {
    console.log('Cancel Response from Digio SDk ');
  };

  return (
    <View>
      <Text style={{textAlign: 'center', color: 'black', }}>Onboarding</Text>
     
                    <Modal
                    style={styles.modalView}
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    > 
                        <View style={styles.centeredView}>


                            <View style={{
                                     fontSize: 15, textAlign: 'center', paddingTop: 10,
                                    borderWidth: 1, borderColor: 'green', backgroundColor: 'white'
                                }}>
                                <Text style={{color: 'black', fontSize: 18, textAlign: 'center',
                            paddingVertical: 15}}>Begin KYC</Text>
                                <Text style={{color: 'green', fontSize: 15, textAlign: 'center'}}>
                                    Please Note: 
                                </Text>
                                <Text style={{padding: 10}}>If any of the PAN details displayed are inaccurate,
                                 do 
                                    correct them.
                                </Text>
                               <View style={{paddingVertical: 10}}>
                               <Button title='Ok' onPress={OnboardingBegin}/>
                               </View>
                               <View style={{paddingBottom: 10}}>
                               <Button title='Close' onPress={()=> setModalVisible(false)}/>
                               </View>
                               
                            </View>
                


                        </View>
                    </Modal> 

                    <Card style={{padding: 20, margin: 30, marginTop: 300}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{textAlign: 'center'}}>Email:{initialData?.data?.customer_identifier}</Text>
                            <TouchableOpacity  >
                                <View style={{backgroundColor: 'green', padding: 8, margin: 5, borderRadius: 10}}>
                                    <Text>Begin Onboarding</Text>
                                    
                                    {/* <DigioRNComponent
      onSuccess={onSuccess}
      onCancel={onCancel}
      options={options}
      digioDocumentId={digioDocumentId}
      identifier={digioUserIdentifier}
      digioToken={digioLoginToken}
    /> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Card>
    </View>
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
        width: 350,
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

export default Onboarding