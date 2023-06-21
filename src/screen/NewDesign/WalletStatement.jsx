import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native'

export default function WalletStatement() {
  return (
   <>

    <View style={styles.container}>
      <Text style={styles.text1}>WalletStatement</Text>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
      <Text style={{color: 'orange', fontSize: 13, }}> Home /  Wallet </Text>
      <Text style={{fontSize: 13}}> Statement</Text>
      </View>
      <View style={{borderWidth: 1, borderColor: 'black', width: '50%', height: "20%", marginLeft: 20, marginVertical: 30}}>
        <TextInput/>

      </View>
    </View>
    <View style={styles.headers}>
        <Text>

        </Text>

    </View>
    <View style= {styles.footer}>
        <Text>

        </Text>

    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        backgroundColor: 'purple'
        
    },
    headers: {
        flex: 1,
        backgroundColor: 'pink'
    },
    footer: { 
        flex: 0.1,
         backgroundColor: 'blue'
    },
    text1: {
        padding: 10,
        marginTop: 25,
        color: 'black',
        fontSize: 20
    }
})