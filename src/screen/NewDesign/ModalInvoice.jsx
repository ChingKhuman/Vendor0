import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import { COLORS, FONTWIEGHT, SIZES } from '../../constants/theme'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Pressable } from 'react-native'
import { Button } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'

export default function ModalInvoice({ visible,  onClose, navigation }) {

    // const [invoiceID, setInvoiceID] = useState(1)
    const [digio_doc_id, setDigio_doc_id] = useState()
    const [txn_id, setTxn_id] = useState()
    const { userInfo } = useContext(AuthContext);

    const InvoiceDigi = () => {
        const token = userInfo.data?.accessToken;
        let raw = JSON.stringify({
            "invoiceID":invoiceID,
            "digio_doc_id":"DID230720175256707EVOKKVZZSSJAQ4",
                    
            "txn_id":"GWT230720175257295NX7VCJGVJZI8VX"
        })
        
    }
  
  return (
    <Modal
    backdropOpacity={0.3}
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.centeredView}>
   

        <View style={styles.modalView}>
            <Text style={{paddingVertical: 30, color: 'black', fontSize: 20}}>Please click the button to complete your funding.</Text>

            <Button title='Ok'/>
            <Button title='Go Back' onPress={()=> navigation.navigate('NewInvoice')}/>
       
        </View> 
    </View>
</Modal>
  )
}

const styles = StyleSheet.create({
   
input: {
    borderWidth: 1, 
    borderColor: 'black',
    borderRadius: 10
},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: 350,

        shadowColor: '#000',
        shadowOffset: {
            width: 50,
            height: 2,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    },
    textStyle: {
        fontSize: 17,
        color: 'black',
        backgroundColor: 'orange',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        paddingVertical: 17,
        borderRadius: 5

    },
    bol: {
        fontFamily: FONTWIEGHT.bold,
        color: COLORS.black,
        fontSize: SIZES.h3
    },
})