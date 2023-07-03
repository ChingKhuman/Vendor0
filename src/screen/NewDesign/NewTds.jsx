import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ScrollView } from 'react-native';
import { useContext } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { BASE_URL } from '../../constants/Config';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-native';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const NewTds = () => {



  const [tds, setTds] = useState()
  const [tdsData, setTdsData] = useState([])
  const [loading, setLaoding] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('default');






  //---------------------Sorting-----------
  const sortTableData = (option) => {


    if (option === 'option1') {
      tdsData?.sort((a, b) => a.transactionAmount - b.transactionAmount);
    } else if (option === 'option2') {
      tdsData?.sort((a, b) => b.transactionAmount - a.transactionAmount);
    }
    setTdsData(tdsData);
  };

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
      
      }).
      then(function (myJson) {
        let result = myJson
        setTds(result)
        setLaoding(false)  

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
        // console.log('check transaction....', result1)
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

  }, [])

  //----------------------Search---------------------


  const filteredData = tdsData?.filter(item => item.counterParty.includes(searchQuery)) 



  // --------------------Pagination-----------------------------


  const totalItems = tdsData?.length; // Replace `data` with your actual data array
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

const tableData = tdsData?.slice(startIndex, endIndex);

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

<TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

<Picker
        selectedValue={sortingOption}
        onValueChange={(itemValue) => {
          setSortingOption(itemValue);
          sortTableData(itemValue);
        }}
      >
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="Low to High Amount" value="option1" />
        <Picker.Item label="High to Low Amount" value="option2" />
        {/* Add more sorting options as needed */}
      </Picker>
      <View style={styles.container}>
        <Text style={{ fontSize: SIZES.h1, padding: 7, textAlign: 'center', color: 'black' }}> TDS Transactions</Text>
      </View>

      <View style={styles.header}>   

        <ScrollView>
          {tds?.code === 500 ? Alert.alert('There is no TDS record right now') : (
            <>
              <View style={styles.tableRow}>
                <Text  style={styles.tableHeader}>REFID</Text>
                <Text  style={styles.tableHeader}>COUNTER PARTY</Text>
                <Text  style={styles.tableHeader}>TRANS AMT</Text>
                <Text  style={styles.tableHeader}>TRANS DATE</Text>
              </View>
              {/* {tableData?.map((item, index) => */}
              {filteredData?.map((item, index) =>
                <>
                  
                    <View style={styles.tableRow}>
                      

                        <Text style={styles.tableCell}>{item.invoiceRefID}</Text>
                    
                     
                        <Text style={styles.tableCell}>{item.counterParty}</Text>
                          
                         <Text style={styles.tableCell}>{item.transactionAmount}</Text>
                       
            
                        <Text style={styles.tableCell}>{item.transactionDate}</Text>
                        
                   

                    </View>
                </>
              )}

            </>
          )
          }
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10,
            paddingRight: 10
          }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', 
          padding: 5}}>
      <Button onPress={handlePrevPage} disabled={currentPage === 1} title='prev'/>
      <Text style={{paddingTop: 7, paddingHorizontal: 4}}>Page {currentPage} of {totalPages}</Text>
      <Button onPress={handleNextPage} disabled={currentPage === totalPages} title='Next'/>
    </View>
          </View>


        </ScrollView>
      </View>
      <Spinner visible={loading} />


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
  

    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'

  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 10,
  
    borderWidth: 1,
    borderColor: '#000',
  },
  footer:
  {
    flex: 0.2,
    backgroundColor: 'white',
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },

  text: {

    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 10
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
  text1: { fontSize: 20, color: 'black', fontFamily: 'serif', color: 'white' },
  textTable: {
    paddingHorizontal: 10,
    fontSize: 14,
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
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },


});
export default NewTds;



