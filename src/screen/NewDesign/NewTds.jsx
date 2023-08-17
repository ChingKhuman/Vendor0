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
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'
import { RefreshControl } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Image } from 'react-native';



const NewTds = () => {



  const [tds, setTds] = useState()
  const [tdsData, setTdsData] = useState([])
  const [loading, setLaoding] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('default');
  const [pdfFilePath, setPdfFilePath] = useState('');

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageNew, setCurrentPageNew] = useState(1);
  const [productsPerPage] = useState(4);
  const [sortOrder, setSortOrder] = useState('asc');
  const [refreshing, setRefreshing] = useState(false);







  //---------------------Sorting-----------
  const sortTableData = (option) => {


    if (option === 'option1') {
      tdsData?.sort((a, b) => a.transactionAmount - b.transactionAmount);
    } else if (option === 'option2') {
      tdsData?.sort((a, b) => b.transactionAmount - a.transactionAmount);
    }
    setTdsData(tdsData);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  //--------------------------------x--------------

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
         console.log('check transaction....', result1)
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

  
  const onRefresh = React.useCallback(() => {
    fetch( `${BASE_URL}/account/validate-jwt`, requestOptions)
        .then(response => response.json()
      ).then(result=>{                 
            // console.log('Check......',result)               
            {
                        if (result.data === null) {
                            showToast('Session Expired.Login Again');
                            
                        }
                        else {
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


  //----------------------Search---------------------

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };




  // --------------------Pagination-----------------------------

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentData = tdsData.slice(indexOfFirstProduct, indexOfLastProduct);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //-----------------


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


  //const filterData = data?.filter((item) => item.counterParty.toLowerCase().includes(searchQuery.toLowerCase())) 

  let tableData = tdsData?.slice(startIndex, endIndex);

  const filterData = tableData?.filter((item) => item.counterParty.toLowerCase().includes(searchQuery.toLowerCase()))
  // console.log(filterData)






  //------------------------For PDF

  const generatePDF = async () => {
    // Step 2: Generate HTML content
    const htmlContent = `
      <html>
        <body>
          <table>
            <thead>
              <tr>
                <th>REFID</th>
                <th>COUNTER PARTY</th>
                <th>TRANS AMT</th>
                <th>TRANS DATE</th>
              </tr>
            </thead>
            <tbody>
              ${tdsData
        .map(
          (row) => `
                  <tr>
                    <td>${row.invoiceRefID}</td>
                    <td>${row.counterParty}</td>
                    <td>${row.transactionAmount}</td>
                    <td>${row.transactionDate}</td>
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
        fileName: 'table_Tds_data',
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
      const destinationPath = `${RNFS.DocumentDirectoryPath}/table_Tds_data.pdf`;
      await RNFS.moveFile(pdfFilePath, destinationPath);

      // Step 5: Share or download the PDF file
      const shareOptions = {
        title: 'Table Data PDF',
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

    <>
     <Image
                source={require('../../../assets/roseBackground.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80} />
      <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

      <TextInput style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, marginHorizontal: 10 }}
        placeholder="Search"
        value={searchQuery}
        autoFocus={true}
        onChangeText={(text) => setSearchQuery(text)
        }

      // onChange={handleSearch}
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
      <View style={{ alignItems: 'center', padding: 10, 
      backgroundColor:'#5B5FB6' }}>
        <Text style={{ fontSize: SIZES.h2, textAlign: 'center' }}> TDS Transactions</Text>

      </View>

        {tds?.code === 500 ? Alert.alert('There is no TDS record right now') : (
          <ScrollView horizontal={true}>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.tableHeader}>REFID</Text>
                <Text style={styles.tableHeader}>InvestorName</Text>
                <Text style={styles.tableHeader}>Unique InvoiceID</Text>
                <Text style={styles.tableHeader}>COUNTER PARTY</Text>
                <Text style={styles.tableHeader}>TRANSFER AMT</Text>
                <Text style={styles.tableHeader}>TRANSFER DATE</Text>
                <Text style={styles.tableHeader}>TRANSFER Status</Text>
                <Text style={styles.tableHeader}>TRANSFER Request Status</Text>
                <Text style={styles.tableHeader}>TRANSFER Type</Text>
              </View>
              {/* {tableData?.map((item, index) => */}

              {/* {currentData.filter((item) => item.counterParty.toLowerCase().includes(searchQuery.toLowerCase())
              ).sort((a,b)=> (sortOrder ==='asc' ? a.transactionAmount.localeCompare(b.name) : b.transactionAmount.localeCompare(a.transactionAmount)))
              .map((item) => ( */}
              {filterData?.map((item, index) =>
                <>

                  <View style={{ flexDirection: 'row' }} key={index.RefID}>

                    <Text style={styles.tableCell}>{item.invoiceRefID}</Text>
                    <Text style={styles.tableCell}>{item.investorName}</Text>
                    <Text style={styles.tableCell}>{item.uniqueInvoiceID}</Text>
                    <Text style={styles.tableCell}>{item.counterParty}</Text>
                    <Text style={styles.tableCell}>{item.transactionAmount}</Text>
                    <Text style={styles.tableCell}>{item.transactionDate}</Text>
                    <Text style={styles.tableCell}>{item.tranStatus}</Text>
                    <Text style={styles.tableCell}>{item.transferReqStatus}</Text>
                    <Text style={styles.tableCell}>{item.transactionType}</Text>
                    



                  </View>
                </>

              )}

            </View>
          </ScrollView>
        )
        }
        <View style={{
          flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10,
          paddingRight: 10
        }}>
          <View style={{
            flexDirection: 'row', justifyContent: 'flex-end',
            padding: 5
          }}>
            {/* <Button title='first' onPress={()=> paginate(1)}/>
            <Button title='prev' onPress={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}/>
          <Button title='Last' onPress={() => paginate(currentPage + 1)}
          disabled={indexOfLastProduct >= products.length}/>
          <Button title='Next' onPress={() => paginate(Math.ceil(products.length / productsPerPage))}/> */}
            <Button onPress={handlePrevPage} disabled={currentPage === 1} title='prev' />
            <Text style={{ paddingTop: 7, paddingHorizontal: 4 }}>Page {currentPage} of {totalPages}</Text>
            <Button onPress={handleNextPage} disabled={currentPage === totalPages} title='Next' />
          </View>
        </View>



   
      <Spinner visible={loading} />

      <View style={{marginVertical: 10}}>
        <Button title="Generate PDF" onPress={generatePDF} />
        {pdfFilePath !== '' && (
          <Button title="Download PDF" onPress={downloadPDF} />
        )}
      </View>
      <View style={styles.footer} >
        <Text style={{ color: 'black', textAlign: 'center', 
         fontFamily:'Calibri-bold', paddingVertical: 10,  }}>
          Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.
          </Text>All right Reserved.</Text>

      </View>
    </ScrollView>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.0,
    backgroundColor: 'white',
    flexDirection: 'row'
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
    width: 85,
    fontFamily:'Calibri-bold',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    width: 15,
    borderWidth: 1,
    borderColor: '#000',
    fontFamily:'Calibri-Regular',
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
    fontFamily:'Calibri-Regular',
    marginLeft: "10%",
  },

  text: {
    fontFamily:'Calibri-bold',
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



