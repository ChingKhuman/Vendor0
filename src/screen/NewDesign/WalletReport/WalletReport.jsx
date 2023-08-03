import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { BASE_URL } from '../../../constants/Config'
import { AuthContext } from '../../../context/AuthContext'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native'
import { SIZES } from '../../../constants/theme'
import Spinner from 'react-native-loading-spinner-overlay'

const WalletReport = () => {
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



  


  const getData1 = () => {
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

    fetch(`${BASE_URL}/transaction/getWalletStatement`, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result = myJson.data
         console.log("cehdkjdlkfjdlfkjdlfkjdfldkjf", result)
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



  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);


  const filteredData = dataSettle?.filter(item => item.transactionType.toLowerCase().includes(searchQuery.toLowerCase()))
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

  


  return (


    <>
<ScrollView>




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
     
      <View style={{ alignItems: 'center', padding: 10, 
      backgroundColor:'#5B5FB6' }}>
        <Text style={{ fontSize: SIZES.h2, textAlign: 'center' }}>Settlement</Text>

      </View>
      <Spinner visible={loading} />
     

      {/* {settle?.code === 500 ? Alert.alert('No data') : ( */}
        <ScrollView horizontal={true}>
     <View>
           
     <View style={{ flexDirection: 'row' }}>
        <Text style={styles.tableHeader}>INVOICE ID</Text>
        <Text style={styles.tableHeader}>TYPE</Text>
        <Text style={styles.tableHeader}>BENEFICIARY</Text>
        <Text style={styles.tableHeader}>WITHDRAWAL</Text>
        <Text style={styles.tableHeader}>DEPOSIT</Text>
        <Text style={styles.tableHeader}>DATE</Text>
        
      </View>

          {search(data)?.slice(0, paginate).map((item, index) =>
            <View style={{ flexDirection: 'row' }} key={index}>

              <Text style={styles.tableCell}>{item.invoiceRefID}</Text>
              <Text style={styles.tableCell}>{item.transactionType}</Text>
              <Text style={styles.tableCell}> {item.userName}</Text>
              <Text style={styles.tableCell}>{item.Withdrawal}</Text>
              <Text style={styles.tableCell}>{item.Deposit}</Text>
              <Text style={styles.tableCell}>{item.createdOn}</Text>
              
            </View>
          )}
     </View>

         
  

        </ScrollView>
        
     
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
            <Button title='Load less' onPress={load_less}/>
          </View>
<View style={{marginVertical: 20}}>
<Button title="Generate PDF" onPress={generatePDF} />
      {pdfFilePath !== '' && (
        <Button title="Download PDF" onPress={downloadPDF} />
      )}
</View>
</ScrollView>
    </>


  );
}

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
  tableHeader: {
    flex: 1,
    padding: 5,
    width: 85,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    width: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  text1: {
    fontSize: 20, color: 'black', fontFamily: 'serif',
    color: 'white'
  }

});


export default WalletReport