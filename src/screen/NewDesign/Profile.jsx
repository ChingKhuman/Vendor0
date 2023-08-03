import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, Button, Image, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../constants/Config';
import Icon from 'react-native-vector-icons/FontAwesome'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Card } from 'react-native-paper';
import { Modal } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';




const Profile = ({ navigation }) => {

  const [modal, setModal] = useState(false)
  const [modal1, setmodal1] = useState(false)
  const [modal2, setmodal2] = useState(false)
  const [modal0, setmodal0] = useState(false)
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [profileData1, setProfileData1] = useState([])
  const [profileData2, setProfileData2] = useState([])
  const [selectedImage, setSelectedImage] = useState('');
  const { loading, userInfo } = useContext(AuthContext);
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
    fetch(`${BASE_URL}/registration/user-profile`, requestOptions)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.')

      }).
      then(function (myJson) {
        let result = myJson.data.left
        setProfileData1(result)
        let result2 = myJson.data.right
        setProfileData2(result2)
        // console.log(myJson)


      })
      .catch(function (error) {
        console.warn('Request failed', error)
      })

  }

  useEffect(() => {
    getData()
  }, [])

  const LeftContent = <Icon name="home" size={30} />

  const ImagePicker = () => {

    let options = {
      storageOptions: {
        path: 'image',
      }
    }
    launchImageLibrary(options, response => {
      setSelectedImage(response.assets[0].uri)

    })
  }



  //-----------------------handle Changing EMail
  const handleChangeMail = () => {
    var raw = JSON.stringify({
      "email": email,
      "phone": phone
    })
    const token = userInfo.data?.accessToken;
    const header = {
      "headers": {
        "Authorization": token
      }
    }
    var requestOptions2 = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: raw,
    }
    fetch(`${BASE_URL}/registration/change-mail-phone`, requestOptions2)
      .then(response => response.text())
      .then(result => {
        console.log(result)
      })
  }

  //------------------------REset Password
  const handleResetPassword = async (values) => {
    // var raw = JSON.stringify({
    //    "currentPasswd": currentPasswd,
    //    "newPasswd": newPasswd
    // });

    //  var myHeaders = new Headers();
    //  myHeaders.append("Authorization", token);
    var raw = JSON.stringify(values);
    const token1 = userInfo.data?.accessToken
    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',  // I added this line
        "Authorization": token1
      },
      body: raw,
      // redirect: 'follow'
    };
    fetch(`${BASE_URL}/account/change-password`, requestOptions)
      .then(response => response.json())

      .then(result => {
        result.code === 500 ? (
          Alert.alert('Cureent is reqd')
        ) : result.code === 400 ? (
          Alert.alert('Curent is Wrong')
        ) : Alert.alert('ok')
          setmodal2(!modal2)
          navigation.navigate('Profile')

        console.log(result)
      }


      )
      .catch(error => console.log('error', error));
  };

  //--------------validate

  const Validated = yup.object().shape({
    currentPasswd: yup.string()

      .min(4, 'Password must be at least 5 characters')
      .max(50, 'Too Long!')
      .required('New Password is required'),
    newPasswd: yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .test('password-match', 'New password must be different from the previous password', function (value) {
        const { currentPasswd } = this.parent;
        return value !== currentPasswd;
      }),
    confirmPassword: yup.string()
      .oneOf([yup.ref('newPasswd'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const Validated1 = yup.object().shape({
    email: yup.string()

      .min(4, 'Password must be at least 5 characters')
      .max(50, 'Too Long!')
      .required('Field is required'),
    phone: yup.string()
      .min(10, 'Too Short!')
      .max(13, 'Too Long!')
      .required('Required')
  });
  //===============ResetMailPhone===

  const handleResetMail = async (values1) => {
    var raw = JSON.stringify(values1)
    const token2 = userInfo.data?.accessToken
    var requestOptions1 = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',  // I added this line
        "Authorization": token2
      },
      body: raw,
      // redirect: 'follow'
    };
    fetch(`${BASE_URL}/registration/change-mail-phone`, requestOptions1)
      .then(response => response.text())

      .then(result => {
        setmodal1(!modal1)
      }
        // console.log(result)
      )
      .catch(error => console.log('error', error));
  };

  //--------------update Nominee-----------
  const handleNominee = () => {

    const formData = new FormData();
    formData.append("nDNomName", formValue.nDNomName);
    formData.append("nDNomRelationship", formValue.nDNomRelationship);
    formData.append("nDNomMobile", formValue.nDNomMobile);
    formData.append("nDNomMailID", formValue.nDNomMailID);
    formData.append("nDNomAddress", formValue.nDNomAddress);

    const token2 = userInfo.data?.accessToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token2);
    const requestOptions2 = {
      method: 'POST',
      headers: myHeaders,
      body: formData
    }
    fetch(`${BASE_URL}/usermanage/update-nominee`, requestOptions2)
      .then(response => response.text())
      .then(result =>


        console.log(result)
        // console.log(result)

      )
  }

  const [listOpen, setListOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    nDNomName: '',
    nDNomRelationship: '',
    nDNomMobile: '',
    nDNomMailID: '',
    nDNomAddress: '',
    nDLegalGardName: '',
    nDLegalGarAddress: ''
  });

  const [isChildSelected, setisChildSelected] = useState(false);

  const listData = [
    { label: 'Spouse', value: '1' },
    { label: 'Adult Child', value: '2' },
    { label: 'Minor Child', value: '3' },
    { label: 'Mother', value: '4' },
    { label: 'Father', value: '5' },
    { label: 'Sibling', value: '6' },
    { label: 'Legal Gaurdian', value: '7' },
    { label: 'Unrealated Person', value: '8' },

  ]

  useEffect(() => {
    if(formValue?.nDNomRelationship==='3'){
      setisChildSelected(true);
    }else{
      setisChildSelected(false);
    }
  }, [formValue?.nDNomRelationship])
  


  return (
    <>

      <ScrollView >
        <View style={styles.header}>

          <View style={{
            alignItems: 'center'
          }}>
            <Image style={{
              borderWidth: 1, borderColor: 'grey', borderRadius: 200,
              padding: 5, height: 100, width: 100
            }}
              source={{ uri: selectedImage }}
            />


          </View>

          <Card style={{ margin: 10 }}>
            <View>

              <View style={{ alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Investor1</Text>
                <Text style={{ fontFamily: 'Georgia', fontSize: 17 }}>Status: Active</Text>
              </View>

              {profileData1.map((item, index) =>
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                  {/* <Seperator /> */}

                  <Text style={styles.text2}>:{item.name}</Text>
                  <Text >:{item.value}</Text>
                </View>
              )}

              <View style={{ alignItems: 'center', marginVertical: 10 }}>
                <TouchableOpacity style={{
                  borderRadius: 5,
                  backgroundColor: 'green', borderWidth: 1,
                  borderColor: 'green', width: 200, paddingVertical: 8, alignItems: 'center'
                }} onPress={() => setmodal0(true)}>
                  <Text style={{ textAlign: 'center' }}>Change Modify</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>


          <Card style={{ margin: 20, marginBottom: 15 }}>


            <View style={{ alignItems: 'center', padding: 10 }}>
              <Text style={{ fontSize: 20, color: 'black', fontFamily: 'serif' }}>Information</Text>

            </View>

            {profileData2.map((item, index) =>
              <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }} key={index.id} >


                <Text style={{ width: 120 }}>{item.name} :</Text>
                <Text style={{ color: 'black' }} >{item.value}</Text>

              </View>)}
          </Card>
        </View>


      </ScrollView>
      <View style={styles.footer} >
        <Text style={{ textAlign: 'center', paddingVertical: 10, fontFamily: 'Georgia' }}>Copyright @ 2021-2022<Text style={{ color: 'blue' }}>UpCap.</Text>All right Reserved.</Text>

      </View>

      {/*------  Modal */}
      <Modal
        backdropOpacity={0.3}

        animationType="fade"
        transparent
        visible={modal}
        onRequestClose={() => setModal(!modal)
        }>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            <View style={{ width: 250, alignItems: 'center' }}>
              <TextInput
                name="Name"
                placeholder="Name"
                style={styles.textInput}
                defaultValue={formValue.nDNomName}
                onChangeText={(item) => setFormValue({
                  ...formValue,
                  nDNomName: item
                })}

              />
              <DropDownPicker
                style={{ position: 'relative' }}
                containerProps={{ height: listOpen === true ? 220 : null, }}
                placeholder="Select your gender"
                placeholderStyle={styles.dropdownPlaceholder}
                open={listOpen}
                setOpen={itemValue => setListOpen(itemValue)}
                items={listData}
                value={formValue.nDNomRelationship}
                setValue={(item) => setFormValue({
                  ...formValue,
                  nDNomRelationship: item(),
                })}
              />


             {
              isChildSelected?
             <>
              <TextInput
                name="Name"
                placeholder="Legal Guardian Name"
                style={styles.textInput}
                defaultValue={formValue.nDLegalGardName}
                onChangeText={(item) => setFormValue({
                  ...formValue,
                  nDLegalGardName: item
                })}

              />
              <TextInput
              name="Name"
              placeholder="Legal Guardian Address"
              style={styles.textInput}
              defaultValue={formValue.nDLegalGarAddress}
              onChangeText={(item) => setFormValue({
                ...formValue,
                nDLegalGarAddress: item
              })}

            /></>
              :null
             }
            

              <TextInput
                name="Mobile"
                placeholder="Mobile"
                style={styles.textInput}
                defaultValue={formValue.nDNomMobile}
                onChangeText={(item) => setFormValue({
                  ...formValue,
                  nDNomMobile: item
                })}

              />
              <TextInput
                name="Mail"
                placeholder="Mail"
                style={styles.textInput}
                defaultValue={formValue.nDNomMailID}
                onChangeText={(item) => setFormValue({
                  ...formValue,
                  nDNomMailID: item
                })}

              />

              <TextInput
                name="Address"
                placeholder="Address"
                style={styles.textInput}
                defaultValue={formValue.nDNomAddress}
                onChangeText={(item) => setFormValue({
                  ...formValue,
                  nDNomAddress: item
                })}

              />







            </View>


            <View >
              <Button title='Submit'
                //  onPress={()=> Alert.alert("Form Value", JSON.stringify(formValue))}
                onPress={handleNominee}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
              </Button>

              <Button title='Close' onPress={() => setModal(!modal)} />
            </View>


          </View>
        </View>
      </Modal>
      {/*-------------------------  Modal1---------- */}
      <Modal backdropOpacity={0.3}
        animationType="fade"
        transparent
        visible={modal1}
        onRequestClose={() => setmodal1(!modal1)
        }>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Formik initialValues={{
              email: '', phone: '',
            }}

              onSubmit={(values) => handleResetMail(values)

              }
              validationSchema={Validated1}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text>Enter New Email</Text>
                  <TextInput style={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder='Enter the New Email'
                    onBlur={handleBlur('email')}
                    value={values.email}
                    onChangeText={handleChange('email')} />

                  <Text>Enter Phone</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder='Enter the Phone No.'
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    onChangeText={handleChange('phone')} />

                  <View>
                    <Button title='Submit' onPress={handleSubmit} />
                    <Text></Text>
                    <Button title='Close' onPress={() => setmodal1(!modal1)} />
                  </View></>
              )}
            </Formik>

          </View>

        </View>
      </Modal>

      {/*-------------------------  Modal2--------------------- */}
      <Modal
        backdropOpacity={0.3}
        animationType="fade"
        transparent
        visible={modal2}
        onRequestClose={() => setmodal2(!modal2)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Formik initialValues={{
              currentPasswd: '', newPasswd: '', confirmPassword: ''
            }}

              onSubmit={(values) => handleResetPassword(values)

              }
              validationSchema={Validated}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <Text>Enter Current Password</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder="Current Password"
                    onBlur={handleBlur('currentPasswd')}
                    value={values.currentPasswd}
                    onChangeText={handleChange('currentPasswd')}

                  />
                  {touched.currentPasswd && errors.currentPasswd &&
                    <Text style={styles.errorText}>{errors.currentPasswd}</Text>}

                  <Text>Enter New Password</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder="New Password"
                    // secureTextEntry
                    value={values.newPasswd}
                    onChangeText={handleChange('newPasswd')}
                  />
                  {touched.newPasswd && errors.newPasswd && (
                    <Text style={styles.errorText}>{errors.newPasswd}</Text>
                  )}

                  <Text>Enter Confirm Password</Text>
                  <TextInput
                    style={{ borderWidth: 1, borderColor: 'black' }}
                    placeholder="Confirm New Password"
                    // secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
                 <View>
                 <Button title='Submit' onPress={handleSubmit} />
                  <Button title='Go Back' onPress={() => setmodal2(!modal2)} />
                 </View>
                </>
              )}

            </Formik>
          
          </View>
        </View>
      </Modal>

      {/*-------------------------  Modal0--------------------- */}
      <Modal
        backdropOpacity={0.3}
        animationType="fade"
        transparent
        visible={modal0}
        onRequestClose={() => setmodal0(!modal0)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ alignItems: 'center', padding: 5 ,paddingVertical: 15 }}>
              <Button title='  Edit New profile  ' onPress={() => {
                ImagePicker();
              }}
                style={{
                  borderRadius: 5,
                  backgroundColor: 'green', borderWidth: 1,
                  borderColor: 'green', width: 200, paddingVertical: 8, alignItems: 'center'
                }}>

              </Button>

            </View>
            <View style={{ alignItems: 'center', padding: 5,paddingVertical: 15 }}>
              <Button title='Change Password' onPress={() => setmodal2(true)}>

              </Button>
            </View>
            <View style={{ alignItems: 'center', padding: 5 ,paddingVertical: 15}}>
              <Button title='Change New Email' onPress={() => setmodal1(true)}>
                <Text style={{ position: 'relative', color: 'white' }}> Change Email</Text>
              </Button>
            </View>
            <View style={{ alignItems: 'center', padding: 5 ,paddingVertical: 15,}}>
              <Button title=' Update    Nominee ' onPress={() => setModal(true)}>
                <Text style={{ position: 'relative', color: 'white' }}> Add Nominee</Text>
              </Button>
            </View>
           <View style={{paddingVertical: 15}} >
           <Button title='Back' onPress={() => setmodal0(!modal0)} />
           </View>
          </View>
        </View>

      </Modal>
    </>
  )
}




const styles = StyleSheet.create({
  container: {

    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
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
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});

export default Profile