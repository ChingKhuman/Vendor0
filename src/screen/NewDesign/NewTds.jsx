import React, { useState, useEffect } from 'react'
import { View, Text, Modal, StyleSheet, Alert, FlatList, SectionList, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ScrollView } from 'react-native';
import { useContext } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { BASE_URL } from '../../constants/Config';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-native';
import PaginationView from './pagination/PaginationView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';


const NewTds = ({ navigation }) => {



  const [tds, setTds] = useState()
  const [tdsData, setTdsData] = useState([])
  const [loading, setLaoding] = useState(false)
  const [current, setCurrent] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
 
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
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
          console.log('check transaction....', result1)
        setTdsData(result1)
        setLaoding(false)
        setFilteredDataSource(result1);
        setMasterDataSource(result1);

      })
      .catch(function (error) {
        console.warn('Request failed', error)
        setLaoding(false)
      })

  }

  useEffect(() => {
    getData1()
  }, [current])


  const loadMoreItem = () => {
    setCurrent(current + 1)
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

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = masterDataSource.filter(
            function (item) {
                const itemData = item.tranStatus
                    ? item.tranStatus.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
        setFilteredDataSource(newData);
        setSearch(text);
    } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);
    }
};

const ItemView = ({ item }) => {
    return (
        // Flat List Item
        <Text
            style={styles.itemStyle}
            onPress={() => getItem(item)}>
            {item.id}
            {'.'}
            {item.tranStatus.toUpperCase()}
        </Text>
    );
};

const ItemSeparatorView = () => {
    return (
        // Flat List Item Separator
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#C8C8C8',
            }}
        />
    );
};

const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
};

  const recordsPerPage = -5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex =  lastIndex - recordsPerPage;
  // const records = tdsData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

function perPage() {
 if(currentPage !== 1){
  setCurrentPage(currentPage -1)
 }
}

function changePage() {
setCurrentPage()
}

function nextPage() {
 if(currentPage !== npage) {
  setCurrentPage(currentPage +1)
 }
}



  return (

    <>

      <View style={styles.container}>
        <Text style={{ fontSize: SIZES.h1, padding: 7, textAlign: 'center', color: 'black' }}> TDS Transactions</Text>
      </View>

      <View style={styles.header}>


{/* 
        <TextInput
          style={styles.textInputStyle}
          //   onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        /> */}
         <Searchbar
                        placeholder="Type Here..."
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                    />

        <ScrollView>
          {tds?.code === 500 ? Alert.alert('There is no TDS record right now') : (
            <>
              <View style={{ flexDirection: 'row',paddingLeft: 10, paddingVertical: 20, borderWidth: 1, borderColor: 'black' }}>
                <Text style={styles.textTable}>REFID</Text>
                <Text style={styles.textTable}>COUNTER PARTY</Text>
                <Text style={styles.textTable}>TRANS AMT</Text>
                <Text style={styles.textTable}>TRANS DATE</Text>
              </View>
              {tdsData?.map((item, index) =>
                <>
                  <>
                    <View style={styles.content} key={index}>
                      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>

                        <Text style={[styles.text, { height: 50, fontSize: 15 }]}>{item.invoiceRefID}</Text>
                      </View>
                      <View style={{ paddingHorizontal: 10, width: '25%',height: 60,  }}>
                        <Text style={[styles.text, {  fontSize: 15,
                       }]}>{item.counterParty}</Text>
                      </View>
                      <View style={{paddingHorizontal: 10, width: '25%' }}>
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

          <PaginationView page={currentPage} />
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10,
            paddingRight: 10
          }}>
            <Button title="Prev" onPress={perPage} disabled={currentPage === 1} />
            {
              numbers.map((n, i) => (
               
               <View 

             {...currentPage === n ? 'active' : ''}>
                  <TouchableOpacity onPress={() => changePage(n)}>{n}</TouchableOpacity>
                  </View>
              ))
            }
            <Button title="Next" onPress={nextPage} />
          </View>
        </ScrollView>
      </View>
      {/* <Spinner visible={loading} /> */}


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
    borderWidth: 1,
    borderColor: 'black'

  },
  footer:
  {
    flex: 0.2,
    backgroundColor: 'white',
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


});
export default NewTds;