import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import Icon1 from 'react-native-vector-icons/Entypo'
import { Card } from 'react-native-paper';
import { COLORS } from '../../constants/theme'


export default function NewReports({navigation}) {
    return (

        <>

            <View style={styles.container}>
                {/* <CustomHeader /> */}

            </View>
            <View style={styles.headers}>
                <Text>Design in Progress</Text>
             

              <View style={{paddingVertical: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('Funding')}>
              <Card style={{backgroundColor: COLORS.green, height: 170,width:300, alignItems: 'center',
            justifyContent: 'center'}}>             
             <Card.Content>
             {/* <IconAnt name="wallet" size={50} color= 'green' /> */}
            <Text style={{color: 'white', alignItems: 'center', fontSize:20}}>Funding</Text>           
             </Card.Content>
           </Card>
              </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('NewSettlement')}>
              <View style={{paddingVertical:20}}>             
              <Card style={{backgroundColor: COLORS.green, height: 170,width:300, alignItems: 'center',
            justifyContent: 'center'}}>             
             <Card.Content>
             {/* <IconAnt name="wallet" size={50} color= 'green' /> */}
            <Text style={{color:'white', fontSize:20}}>Settlement</Text>           
             </Card.Content>
           </Card>
           </View>
              </TouchableOpacity>   

              <View>
          <TouchableOpacity onPress={() => navigation.navigate('NewTds')}>
          <Card style={{backgroundColor: COLORS.green, height: 170,width:300, justifyContent:'center',alignItems:'center'}}>        
        <Card.Content>
        {/* <IconAnt name="wallet" size={50} color= 'green' /> */}
       <Text style={{color:'white', fontSize:20}}>TDS</Text>
      
        </Card.Content>
      </Card>
          </TouchableOpacity>
              
               
                </View>
               
            </View>

            {/* <View style={styles.footer}>

                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>


                    <View style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>
                        <TouchableOpacity onPress={()=> navigation.navigate('NewHome')}>
                            <Text>
                                Dashboard
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 50 }}>
                        <Icon1 name='archive' size={40} color='black' />
                    </View>

                    <View style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>
                        <TouchableOpacity onPress={()=> navigation.navigate('NewInvoice')}>
                            <Text>Invest</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View> */}






        

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.0,
        backgroundColor: 'green'
    },
    headers: {
        flex: 11,
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: 'white'
    },
    footer: {
        flex: 1,
        alignItems: 'center',

    }
})