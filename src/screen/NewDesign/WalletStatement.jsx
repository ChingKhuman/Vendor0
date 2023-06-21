import { View, Text, Button, StyleSheet, TextInput, Modal, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import moment from "moment";
import DateRangePicker from 'rnv-date-range-picker';
import { Pressable } from 'react-native';



export default function WalletStatement() {

  const [selectedRange, setRange] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState()

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
<TouchableOpacity  onPress={() => setModalVisible(true)}>
<Text style={{backgroundColor: 'blue', marginTop: 23,color: 'white', paddingVertical: 6, fontSize:17,
borderRadius: 10}}> Seclect Date</Text>
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
        <Text style={{paddingHorizontal: 10}}>Download Pdf</Text>
        <TextInput
          style={styles.textInputStyle}
          //   onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

        <View style={{
          flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 15,
          borderWidth: 1, borderColor: 'black'
        }}>
          <Text style={styles.textTable}>Date</Text>
          <Text style={styles.textTable}>Benificiary</Text>
          <Text style={styles.textTable}>Investment</Text>
          <Text style={styles.textTable}>Balance</Text>
          <Text style={styles.textTable}>Remark</Text>
        </View>
        {data?.map((item, index) =>
       <ScrollView>
         <View style={styles.content} key={index}>
           <View style={{  }}>
                    <Text style={[styles.text, { height: 25, fontSize: 10 }]}>{item.transactionDate}</Text>
                  </View>
                  <View style={{paddingHorizontal:10}}>

                    <Text style={[styles.text, { height: 25, fontSize: 10 }]}>{item.invoiceRefID}</Text>
                  </View>
                  <View style={{ paddingHorizontal:25 }}>
                    <Text style={[styles.text, { height: 25, fontSize: 10 }]}>{item.counterParty}</Text>
                  </View>
                  <View style={{ paddingHorizontal:20 }}>
                    <Text style={[styles.text, { height: 25, fontSize: 10 }]}>{item.transactionAmount}</Text>
                  </View>
                 
                  <View style={{  }}>
                    <Text style={[styles.text, { height: 25, fontSize: 10 }]}>{item.invoiceRefID}</Text>
                  </View>

                </View>
       </ScrollView>
  )}
  <View style={{borderTopWidth: 1, borderTopColor: 'grey', paddingVertical:5, marginVertical: 10}}>
    <Text style={{color: 'black', fontSize: 13, paddingLeft: 5}}>Showing __ to __ entries</Text>
  </View>
      </View>
      
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
    flex: 0.1,
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