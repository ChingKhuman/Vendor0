import React, { useState, useContext, useEffect, useRef } from 'react';
import {  StyleSheet, Text, View, Alert, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../constants/Config';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from '../../context/AuthContext';
import { COLORS, SIZES } from '../../constants/theme';
import { Picker } from '@react-native-picker/picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNFS from 'react-native-fs'
import Share from 'react-native-share'
import { ToastAndroid } from 'react-native';
import { RefreshControl } from 'react-native';
import { Image } from 'react-native';
import XLSX from 'xlsx'
import { Permission } from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';
import {writeFile, readFile, DowloadDirectoryPath} from 'react-native-fs'
import axios from 'axios';
import { Card } from 'react-native-paper';







const NewSettlement = () => {

  const [settle, setSettle] = useState()
  const [dataSettle, setDataSettle] = useState([])
  const [loading, setLoading] = useState(false)
  const { userInfo } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('Sort by');
  const [pdfFilePath, setPdfFilePath] = useState('');
  const [paginate, setpaginate] = useState(8);
  const [refreshing, setRefreshing] = useState(false);



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

    fetch(`${BASE_URL}/transaction/getSettlementTransactiondetails`, requestOptions)
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
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getData1()
  }, [])

  const data = Object.values(dataSettle || {});
  const search_parameters = Object.keys(Object.assign({}, ...data));

  function search(data) {
    return dataSettle?.filter(
      (item) =>
        search_parameters.some((parameter) =>
          item[parameter].toString().toUpperCase().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }

  const filter_items = [...new Set(data.map((item) => item.transactionType))];

  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 8);
  };
  const load_less = (event) => {
    setpaginate((prevValue) => prevValue - 8);
  };

  const totalItems = dataSettle?.length; // Replace `data` with your actual data array
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


  const filteredData = dataSettle?.filter(item => item.userName.toLowerCase().includes(searchQuery.toLowerCase()))
  const tableData = filteredData?.slice(startIndex, endIndex);


  //---------------------Sorting-----------
  const sortTableData = (option) => {


    if (option === 'option1') {
      dataSettle?.sort((a, b) => a.transactionAmount - b.transactionAmount);
    } else if (option === 'option2') {
      dataSettle?.sort((a, b) => b.transactionAmount - a.transactionAmount);
    }
    setDataSettle(dataSettle);
  };

  const generatePDF = async () => {
    // Step 2: Generate HTML content
    const htmlContent = `
      <html>
        <body>
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${dataSettle
                .map(
                  (row) => `
                  <tr>
                    <td>${row.uniqueInvoiceID}</td>
                    <td>${row.transactionType}</td>
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
        fileName: 'table_Settlement_data',
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
      const destinationPath = `${RNFS.DocumentDirectoryPath}/table_Settlement_data.pdf`;
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

//----------------Download excel
const [apiResponse, setApiResponse] = useState(null);

const generateExcelData = (apiResponse) => {
  const worksheet = XLSX.utils.json_to_sheet(apiResponse);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
  return excelData;
};

const handleApiResponse = async () => {
  var token = userInfo.data?.accessToken
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var raw = "";

  var requestOptions1 = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch( `${BASE_URL}/transaction/getSettlementTransactiondetails`, requestOptions1
  );
  const data = await response.json();
  setApiResponse(data);

const excelData = generateExcelData(data);

const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/data.xlsx`;

await RNFetchBlob.fs.writeFile(filePath, excelData, 'base64');
}

//----------------


 const exportDataToExcel = () => {
  
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(dataSettle)
  XLSX.utils.book_append_sheet(wb,ws,'Users')
  const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

  // Write generated excel to Storage
  const excelFilePath = RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx';
  console.log('Excel file path:', excelFilePath);

  writeFile(RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx', wbout, 'ascii').then((r)=>{
   console.log('Success');
  }).catch((e)=>{
    console.log('Error', e);
  });

}
const handleClick = async () => {

  try{
    // Check for Permission (check if permission is already given or not)
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    if(!isPermitedExternalStorage){

      // Ask for permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage permission needed",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted (calling our exportDataToExcel function)
        exportDataToExcel();
        Alert.alert("Permission granted");
      } else {
        // Permission denied
        Alert.alert("Permission denied");
      }
    }else{
       // Already have Permission (calling our exportDataToExcel function)
       exportDataToExcel();
    }
  }catch(e){
    console.log('Error while checking permission');
    console.log(e);
 }
}







  return (


    <>
    <Image
                source={require('../../../assets/roseBackground.jpg')}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80} />
<ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>




     <Card style={{margin:8}}>
     <TextInput
      style={{ borderWidth: 1, borderColor: 'black', marginTop: 10, marginHorizontal: 10 }}
        placeholder="Search"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      
     

      <Picker
      style={{width: 170}}
        selectedValue={sortingOption}
        onValueChange={(itemValue) => {
          setSortingOption(itemValue);
          sortTableData(itemValue);
        }}
      >
        <Picker.Item label="Sort" value="sort" />
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="Low to High Amount" value="option1" />
        <Picker.Item label="High to low Amount" value="option2" />
        {/* Add more sorting options as needed */}
      </Picker>
     </Card>
     
      <View style={{ alignItems: 'center', padding: 10, 
      backgroundColor:'#5B5FB6' ,marginBottom: 10}}>
        <Text style={{ fontSize: SIZES.h2, textAlign: 'center' }}>Settlement</Text>

      </View>
      <Spinner visible={loading} />
     

      {settle?.code === 500 ? Alert.alert('You have not funded an invoice yet, or the invoices you funded are not yet settled.') : (
        <ScrollView horizontal={true}>
     <View>
           
     <View style={{ flexDirection: 'row' }}>
        <Text style={styles.tableHeader}>INVOICE</Text>
        <Text style={styles.tableHeader}>TYPE</Text>
        <Text style={styles.tableHeader}>AMOUNT</Text>
        <Text style={styles.tableHeader}>DATE</Text>
        <Text style={styles.tableHeader}>Tenure</Text>
        <Text style={styles.tableHeader}>No</Text>
        <Text style={styles.tableHeader}>AMOUNT</Text>
        <Text style={styles.tableHeader}>DATE</Text>
      </View>

          {search(data)?.slice(0, paginate).map((item, index) =>
            <View style={{ flexDirection: 'row' }} key={index}>

              <Text style={styles.tableCell}>{item.invoiceRefID}</Text>
              <Text style={styles.tableCell}>{item.invoiceTenure}</Text>
              <Text style={styles.tableCell}> {item.userName}</Text>
              <Text style={styles.tableCell}>{item.invoicePaymentDue}</Text>
              <Text style={styles.tableCell}>{item.SettlementDate}</Text>
              <Text style={styles.tableCell}>{item.FundedAmount}</Text>
              <Text style={styles.tableCell}> {item.GrossYield}</Text>
              <Text style={styles.tableCell}>{item.TDS}</Text>
            </View>
          )}
     </View>

         
  

        </ScrollView>
        
      )

      }
        <View style={{
            flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10,
            paddingRight: 10, marginTop: 20
          }}>
            {/* <View style={{
              flexDirection: 'row', justifyContent: 'flex-end',
              padding: 5
            }}>
              <Button onPress={handlePrevPage} disabled={currentPage === 1} title='prev' />
              <Text style={{ paddingTop: 7, paddingHorizontal: 4 }}>Page {currentPage} of {totalPages}</Text>
              <Button onPress={handleNextPage} disabled={currentPage === totalPages} title='Next' />
            </View> */}
            <Button title='Load more' onPress={load_more}/>
            <Text style={{paddingHorizontal: 5}}></Text>
            <Button title='Load less' onPress={load_less}/>
          </View>
<View style={{marginVertical: 20}}>
<Button title="Generate PDF" onPress={generatePDF} />
      {pdfFilePath !== '' && (
        <Button title="Download PDF" onPress={downloadPDF} />
      )}

<Button title="Download Excel" onPress={handleClick} />
</View>
</ScrollView>
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
    fontFamily:'Calibri-bold',

  },
  content: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    marginTop: 8
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    width: 85,
    // fontFamily:'Calibri-bold',
    borderWidth: 1,
    borderColor: '#000',
    color:'black',
    fontWeight:'bold'
  },
  tableCell: {
    flex: 1,
    padding: 5,
    width: 15,
    borderWidth: 1,
    borderColor: '#000',
    fontFamily:'Calibri-Regular',
  },
  text1: {
    fontSize: 20, color: 'black',  fontFamily:'Calibri-Regular',
    color: 'white'
  }

});



export default NewSettlement;

