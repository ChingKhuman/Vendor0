import React, { useEffect, useState } from 'react';
import { DigioRNComponent } from 'digio-sdk-rn';


const OnboardingDigio = ({initialData}) => {
  

const digiID = initialData?.data?.kyc_ID
const digioUserIdentifiervalue = initialData?.data?.customer_identifier
const digiToken = initialData?.data?.access_token

const [digioDocumentId, setDigioDocumentId] = useState(digiID);
const [digioUserIdentifier, setDigioUserIdentifier] = useState(digioUserIdentifiervalue);
const [digioLoginToken, setDigioLoginToken] = useState(digiToken);

//   const [options, setOptions] = useState({
//     "environment": "sandbox",
//     "logo": "yourlogourl",
//     // "theme": {
//     //   "primaryColor": "#234FDA", // < 6 char color hex code only e.g. #234FDA, used for background
//     //   "secondaryColor": "#234FDA", // < 6 char color hex code only e.g. #234FDA, used for font color
//     // },
//   });
const options={
  environment:'sandbox',
  callback:function(response){
    if(response.hasOwnProperty('error_code')){
      return console.log(response)
    }
    console.log(response);
    let request ={
      'invoiceID' : invoiceID,
      'digio_doc_id': response.digio_doc_id,
      'txn_id': response.txn_id
    }
    const signRequest = api.walletSign;
    fetch(`${BASE_URL}/walletSign`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        Authorization:userInfo?.code.accessToken
      },
      body:JSON.stringify(request)
    })
    .then((response)=>response.json())
    .then((result)=>{
      console.log(JSON.stringify(result))
      if(result.code === 500){
        Alert.alert("Agreement Signing",result.message,pic)
      }else{
        Alert.alert("Agreement Signing",result.message,pic)
      //   .then((okClicked)=>{
      //     if(okClicked){
      //       window.location.reload();
      //     }
      //   })
      }
     
    })
  },
  logo: 'https://finsightventures.in/upcap/assets/dist/img/Logo.png',
  theme: {
      primaryColor: '#AB3498',
      secondaryColor: '#000000'
  }
}
const digio = new DigioRNComponent(options);
digio.init();
digio.submit(digiID,digioUserIdentifiervalue,digiToken);
setTimeout(function () {
  setLoading(true)
}, 1000);

  return (
    <DigioRNComponent
      onSuccess={onSuccess}
      onCancel={onCancel}
      options={options}
      digioDocumentId={digioDocumentId}
      identifier={digioUserIdentifier}
      digioToken={digioLoginToken}
    />
  );
};

export default OnboardingDigio;