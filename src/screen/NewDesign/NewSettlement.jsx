import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, TouchableOpacity, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { BASE_URL } from '../../constants/Config';

import Spinner from "react-native-loading-spinner-overlay/lib";
import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { AuthContext } from '../../context/AuthContext';
import { COLORS, SIZES } from '../../constants/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const NewSettlement = ({ navigation }) => {



  const [settle, setSettle] = useState()
  const [dataSettle, setDataSettle] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo)
  const token = userInfo.data?.accessToken
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var raw = "";

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const getData = () => {
   setLoading(true)
    fetch(`${BASE_URL}/transaction/investor-transaction`, requestOptions)

      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result = myJson
        //  console.log("cehdkjdlkfjdlfkjdlfkjdfldkjf", result)
        setSettle(result)
        setLoading(false)
        

      })
      .catch(function (error) {
        console.warn('Request failed', error)
        setLoading(false)
      })

  }

  useEffect(() => {
    getData()
  }, [])

  const getData1 = () => {
   
    fetch(`${BASE_URL}/transaction/investor-transaction`, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result = myJson.data
          // console.log("cehdkjdlkfjdlfkjdlfkjdfldkjf", result)
        setDataSettle(result)
        

      })
      .catch(function (error) {
        console.warn('Request failed', error)
      })

  }

  useEffect(() => {
    getData1()
  }, [])




const Tab = createBottomTabNavigator();

data = [{
  "uniqueInvoiceID": "INVOICE1",
  "transactionType": "FUNDED AMOUNT",
  "transactionAmount": "40350.00",
  "transactionDate": "04-04-2023"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},
{
  "uniqueInvoiceID": "INVOICE2",
  "transactionType": "UNFUNDED",
  "transactionAmount": "308442.33",
  "transactionDate": "7868789"
},

]
  return (


    <>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingBottom: 30}}>
      {/* <Text style={{ fontSize: 20, padding: 7 , }}> Settlement</Text> */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
      
        <Text style={{ fontSize: SIZES.h2, }}>Settlements</Text>
      </View>

    </View>
    {/* <Spinner visible={loading} /> */}

    {settle?.code === 500 ? Alert.alert('You have not funded an invoice yet, or the invoices you funded are not yet settled.') : (
      <ScrollView>
        {/* <View style={{height:100, width: '100%', borderWidth:1, borderColor:'black'}}>
        <Text>Finsight Settlement</Text>
        </View> */}
            {dataSettle.map((item, index) => 
              <View style={{paddingHorizontal: 20, paddingVertical: 15}} >
               
              <Card style={{backgroundColor: COLORS.green}}>
                <Card.Content>
                {/* <IconAnt name="wallet" size={50} color= 'green' /> */}
               
                  <Text style={styles.text1}>Invoice: {item.uniqueInvoiceID}</Text>
                  <Text style={styles.text1}>Type: {item.transactionType}</Text>
                  <Text style={styles.text1}>Amount: {item.transactionAmount}</Text>
                  <Text style={styles.text1}>Date: {item.transactionDate}</Text>
                  {/* <Text> undefined</Text>
                  <Text>
                  Funded Amount
                  </Text>
                  <Text>40350.00</Text>
                  <Text>04-04-2023</Text> */}
                </Card.Content>
              </Card>
              </View>
            )}
        
      </ScrollView>
    )

    }

    
  </>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', padding: 10
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 25,
    backgroundColor: '#273A67'

  },
  headers: {
    flex: 11,
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: 'white'
},
  text: {
    color: 'black',
    fontFamily: 'serif',
    fontWeight: 'bold'

  },
  content: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginTop: 8
  },
  text1: {fontSize: 20, color: 'black',fontFamily: 'serif',
color: 'white'}
 
});



export default NewSettlement;

