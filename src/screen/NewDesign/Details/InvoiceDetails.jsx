import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Dimensions } from 'react-native';

const InvoiceDetails = () => {

    const route = useRoute();
    const { item } = route.params;

    const windowWidth = Dimensions.get('window').width;

    return (
        <>

            <ScrollView>
                <View style={styles.header}>
                <Card>
                    <Text style={{
                        textAlign: 'center', fontSize: 30, color: 'black'
                        , paddingTop: 10
                    }}> {item.uniqueInvoiceID} </Text>
                    <Text style={{textAlign: 'center', fontSize: 30, color: 'black'
                        , paddingTop: 0}}>{item.anchor}</Text>
                </Card>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20, paddingTop: 30
                }}>
                    <Text>Invoice ID</Text>
                    <Text>{item._invoiceID}   </Text>
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Item Owner</Text>
                    <Text>{item.ownerID}   </Text>
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Counter Party</Text>
                    <Text>{item.counterpartyID}   </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Type</Text>
                    <Text>{item.financingType}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Ref ID</Text>
                    <Text>{item.invoiceRefID}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Date</Text>
                    <Text>{item.invoiceDate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Invoice Amount</Text>
                    <Text>{item.invoiceAmount}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Invoice Payment Due</Text>
                    <Text>{item.invoicePaymentDue}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Original Invoice Payment Due Date</Text>
                    <Text>{item.originalPaymentDueDate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Funding Goal</Text>
                    <Text>{item.fundingGoal}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Funding Value</Text>
                    <Text>{item.fundedValue}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Status</Text>
                    <Text>{item.status}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Expiry Date</Text>
                    <Text>{item.expiryDate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Invoice Status Name</Text>
                    <Text>{item.invoiceStatusName}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Excess Interest Amount</Text>
                    <Text>{item.excessInterestAmount}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Settle Amount</Text>
                    <Text>{item.settledAmount}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Invest Note</Text>
                    <Text style={{width: 100}}>{item.investmentNote}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Discount Rate</Text>
                    <Text>{item.discountRate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Funding Rate</Text>
                    <Text>{item.fundingRate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Uploaded Date</Text>
                    <Text>{item.uploadedDate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Activation Date</Text>
                    <Text>{item.activationDate}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Invoice Tenure</Text>
                    <Text>{item.invoiceTenure}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Fund Type</Text>
                    <Text>{item.fundType}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Owner Name</Text>
                    <Text>{item.ownerName}  </Text>                    
                </View>
                {/* <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Profile Pic</Text>
                    <Text>{item.vendorProfilePic}  </Text>                    
                </View> */}
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Counter Party Name</Text>
                    <Text>{item.counterpartyName}  </Text>                    
                </View>
                {/* <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Counter Party Profile Pic</Text>
                    <Text>{item.counterpartyProfilePic}  </Text>                    
                </View> */}
                 <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Unfunded Value</Text>
                    <Text>{item.UnfundedValue}  </Text>                    
                </View>
                <View style={{
                    alignItems: 'center', flexDirection:'row',justifyContent:'space-between'
                    ,paddingHorizontal: 20
                }}>
                    <Text>Anchor</Text>
                    <Text>{item.anchor}  </Text>                    
                </View>
                

                {/* <Card>
    <View style={{width: windowWidth, paddingRight: 30,}}>
                                   
                                        <>
                                            <View style={styles.View8} >
                                               
                                              
                                              
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.invoiceTenure}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.fundType}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.ownerName}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.vendorProfilePic}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.vendoruserHomeDir}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.counterpartyName}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.counterpartyProfilePic}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.counterpartyuserHomeDir}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.UnfundedValue}</Text>
                                                 <Text style={{fontSize: 14, paddingHorizontal: 15
                                                }}>ID:{item.anchor}</Text>





                                                
                                            </View>
                                        </>
                                  

                                </View>  
  
    </Card> */}
    </View>
            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    View8: {
        alignItems: 'center',

    },

})

export default InvoiceDetails