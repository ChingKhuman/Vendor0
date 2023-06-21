import React, { useState,  useEffect } from 'react'
import { View, Text, Modal, StyleSheet, Alert, FlatList, SectionList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ScrollView } from 'react-native';
import { useContext } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { BASE_URL } from '../../constants/Config';
import { AuthContext } from '../../context/AuthContext';


const NewTds = ({navigation}) => {



  const [tds, setTds] = useState()
  const [tdsData, setTdsData] = useState([])
  const [loading, setLaoding] = useState(false)
  const [current, setCurrent ] = useState(1)
  const [search, setSearch] = useState()


  const { userInfo } = useContext(AuthContext);
  // console.log(userInfo)
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
  const getData = () => {
    setLaoding(true)
    fetch(`${BASE_URL}/transaction/investor-tds-transaction`, requestOptions)
      .then(function (response) {
        return response.json()
        // if (response.ok) {
        //   return response.json();
        // }
        // throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result = myJson
        console.log('checkingTds', myJson)

        setTds(result)
        setLaoding(false)
        console.log(result)

      })
      .catch(function (error) {
        console.warn('Request failed', error)
        setLaoding(false)
      })

  }

  useEffect(() => {
    getData()
  }, [])

  const getData1 = () => {
    setLaoding(true)
    fetch(`${BASE_URL}/transaction/investor-tds-transaction`, requestOptions)
      .then(function (response) {
        // return response.json()
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result1 = myJson?.data
        //  console.log('check transaction....', result1)
        setTdsData(result1)
        setLaoding(false)

      })
      .catch(function (error) {
        console.warn('Request failed', error)
        setLaoding(false)
      })

  }

  useEffect(() => {
    getData1()
  }, [current])


  const loadMoreItem =() => {
  setCurrent(current + 1 )
  }

  data = [{
    "invoiceRefID": "INVOICE1",
    "counterParty": "FUNDED",
    "transactionAmount": "40350.00",
    "transactionDate": "04-04-2023"
  },
  {
    "invoiceRefID": "INVOICE2",
    "counterParty": "UNFUNDED ",
    "transactionAmount": "30350.00",
    "transactionDate": "06-04-2023"
  },
  {
    "invoiceRefID": "INVOICE3",
    "counterParty": "FUNDED ",
    "transactionAmount": "50350.00",
    "transactionDate": "03-04-2023"
  },
  {
    "invoiceRefID": "INVOICE4",
    "counterParty": "FUNDED",
    "transactionAmount": "40350.00",
    "transactionDate": "07-04-2023"
  },
  {
    "invoiceRefID": "INVOICE5",
    "counterParty": "FUNDED ",
    "transactionAmount": "40350.00",
    "transactionDate": "02-04-2023"
  },
  {
    "invoiceRefID": "INVOICE6",
    "counterParty": "FUNDED ",
    "transactionAmount": "70350.00",
    "transactionDate": "08-04-2023"
  },
  {
    "invoiceRefID": "INVOICE6",
    "counterParty": "FUNDED ",
    "transactionAmount": "70350.00",
    "transactionDate": "08-04-2023"
  },
  {
    "invoiceRefID": "INVOICE6",
    "counterParty": "FUNDED ",
    "transactionAmount": "70350.00",
    "transactionDate": "08-04-2023"
  },
  {
    "invoiceRefID": "INVOICE6",
    "counterParty": "FUNDED ",
    "transactionAmount": "70350.00",
    "transactionDate": "08-04-2023"
  },
 
  
  ]
  return (

    <>

    <View style={styles.container}> 

    </View>
 
      <View style={styles.header}>
        <Text style={{ fontSize: SIZES.h2, padding: 7 }}> TDS Transactions</Text>
        <View style={{ flexDirection: 'row' }}>
          
        </View>

<TextInput
          style={styles.textInputStyle}
        //   onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View>
      {/* <Spinner visible={loading} /> */}
      <ScrollView>
      {tds?.code === 500 ? Alert.alert('There is no TDS record right now') : (
        <>
            <View style={{flexDirection:'row', paddingHorizontal:5,paddingVertical: 20, borderWidth:1, borderColor:'black' }}>
              <Text style={styles.textTable}>InvoiceRefID</Text>
              <Text style={styles.textTable}>CounterParty</Text>
              <Text style={styles.textTable}>TransAmt</Text>
              <Text style={styles.textTable}>TransDate</Text>
            </View>
            {tdsData?.map((item, index) =>
            <>
               <>
                <View style={styles.content} key={index}>
                  <View style={{paddingHorizontal:10}}>

                    <Text style={[styles.text, { height: 50, fontSize: 17 }]}>{item.invoiceRefID}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={[styles.text, { height: 30, fontSize: 15 }]}>{item.counterParty}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={[styles.text, { height: 30, fontSize: 17 }]}>{item.transactionAmount}</Text>
                  </View>
                  <View style={{ width: '25%' }}>
                    <Text style={[styles.text, { height: 30, fontSize: 17 }]}>{item.transactionDate}</Text>
                  </View>

                </View></>
            </>
             )}
           
         
        </>
      )
      }
      </ScrollView>

      <View>
      </View>
      <View style={styles.footer} >
            <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

          </View>


  </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.0,
    backgroundColor: 'white'
},
header: {
  flex: 1.8,
  alignItems: 'center',
  
  backgroundColor: 'white',
  borderWidth:1,
  borderColor:'black'

},
  footer: 
    {
      flex: 0.6,
      backgroundColor: 'white',
       },
  
  text: {
   
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: '10px'
  },

  content: {
  
    flexDirection: 'row',
    padding: 10,
    marginTop: 8,
   
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center'
  },
  text1: {fontSize: 20, color: 'black', fontFamily: 'serif', color: 'white'},
  textTable: {
    paddingHorizontal:10,
    fontSize: 15,
    color: 'black'
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },


});
export default NewTds;