import { View, Text, Button, StyleSheet, TextInput, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import moment from "moment";
import DateRangePicker from 'rnv-date-range-picker';
import { Pressable } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';





export default function WalletStatement() {

  const [selectedRange, setRange] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState()
  const [table, setTable] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('default');

  


const totalItems = table?.length; // Replace `data` with your actual data array
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

const tableData = table?.slice(startIndex, endIndex);

const filteredData = tableData?.filter(item => item.transactionType.includes(searchQuery))


 //---------------------Sorting-----------
 const sortTableData = (option) => {


  if (option === 'option1') {
    table?.sort((a, b) => a.credit - b.credit);
  } else if (option === 'option2') {
    table?.sort((a, b) => b.credit - a.credit);
  }
  setTable(table);
};
 

  const { userInfo } = useContext(AuthContext);
  // // console.log(userInfo)
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

 const tabData= () => {
  fetch("http://192.168.0.163:9902/transaction/report_statement/?from_date=2022-09-01T00:00:00.000Z&to_date=2023-06-22T11:35:24.091Z&_=1687433722983", requestOptions)
  .then(function (response) {
    return response.json();
  }).
  then(function (myJson) {
    let tableData = myJson.data;
    // console.log("chcekthe data,,,,,,,,,,,,", tableData)
    setTable(tableData)
  })
 
  .catch(error => console.log('error', error));
 }

 useEffect(() => {
  tabData()
 }, [])

 const arr = [];
 const arrOfObj = table?.forEach(object => {
  arr.push(object.beneficiaryName)
  console.log(arrOfObj)
 })

 const source = { uri: 'http://192.168.0.163:9909/upcap/admin/WalletReport.pdf', cache: true };


  return (
    <>
 <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text1}>Wallet</Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text style={{ color: 'orange', fontSize: 13, }}> Home /  Wallet </Text>
          <Text style={{ fontSize: 13 }}> Statement</Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            borderWidth: 1, borderColor: 'black', width: '60%', height: "30%", marginLeft: 20, marginVertical: 30,
            flexDirection: 'row', marginHorizontal: 10
          }}>
            <Text style={{ color: 'black', paddingHorizontal: 10 }}>From: {selectedRange.firstDate}</Text>
            <Text style={{ color: 'black', }}>To: {selectedRange.secondDate}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{
              backgroundColor: 'blue', marginTop: 23, color: 'white', paddingVertical: 6, fontSize: 17,
              borderRadius: 10
            }}> Seclect Date</Text>
          </TouchableOpacity>

        </View>
      </View>
      <Modal animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ margin: 50, backgroundColor: 'white' }}>

          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(100, "days")}

          />
          <View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, backgroundColor: 'red' }}>Close</Text>
            </Pressable>
          </View>
        </View>

      </Modal>

      <View style={styles.headers}>
        <View style={{ padding: 10, flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: 'black' }}> Show</Text>
          <Text style={{ height: 23, width: 35, backgroundColor: 'grey', marginLeft: 20, marginTop: 2 }}></Text>
          <Text> entries</Text>
        </View>

        <TouchableOpacity style={{backgroundColor: 'green'}}>
        <Text style={{ paddingHorizontal: 10 }}>Download Pdf</Text>
        
        </TouchableOpacity>
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
        <Picker.Item label="High to low Amount" value="option2" />
        {/* Add more sorting options as needed */}
      </Picker>

        <View>
          <View style={{flexDirection: 'row', borderWidth: 1, borderColor: 'grey' }}>
            <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 10, paddingLeft: 30}}>Date</Text>
            <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 10, paddingLeft: 30}}>Benificiary</Text>
            <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 10}}>Invest</Text>
            <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 10}}>Deposit</Text>
            <Text style={{fontSize: 15, color: 'black', paddingHorizontal: 10}}>Remarks</Text>
          </View>
        
         {filteredData?.map((item, index) =>
         
           
         <View style={styles.content} key={index}>
         <View style={{ height:20, paddingHorizontal: 10}}>
           <Text style={[styles.text, {  fontSize: 12 }]}>{item.date}</Text>
         </View>
         <View style={{ paddingHorizontal: 10 }}>

           <Text style={[styles.text, { fontSize: 12 }]}>{item.beneficiaryName}</Text>
         </View>
         <View style={{ paddingHorizontal: 10 }}>
           <Text style={[styles.text, {  fontSize: 12 }]}>{item.debit}</Text>
         </View>
         <View style={{ }}>
           <Text style={[styles.text, {  fontSize: 12 }]}>{item.credit}</Text>
         </View>

         <View style={{paddingHorizontal: 10, width: '45%', }}>
           <Text style={[styles.text, {  fontSize: 12 }]}>{item.remarks}</Text>
         </View>

       </View> 
             
   )} 
        </View>
       
         <View style={{ borderTopWidth: 1, borderTopColor: 'grey', paddingVertical: 5, marginVertical: 10 }}>
          <Text style={{ color: 'black', fontSize: 13, paddingLeft: 5 }}>Showing __ to __ entries</Text>
        </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
      <Button  title='Prev' onPress={handlePrevPage} disabled={currentPage === 1}/>
      <Text style={{paddingTop: 8, paddingHorizontal: 5, color: 'black'}}>Page {currentPage} of {totalPages}</Text>
      <Button title='Next' onPress={handleNextPage} disabled={currentPage === totalPages}/>
    </View>

      
      </ScrollView>
      <View style={styles.footer}>       

        <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', paddingTop: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,


  },
  headers: {
    flex: 1,
    backgroundColor: 'pink'
  },
  footer: {
    flex: 0.2,
    backgroundColor: 'white'
  },
  text1: {
    padding: 10,
    marginTop: 10,
    color: 'black',
    fontSize: 20
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  textTable: {
    paddingHorizontal: 10,
    fontSize: 15,
    color: 'black'
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
})