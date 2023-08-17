import { View, Text, TextInput, Alert, SafeAreaView, } from 'react-native'
import React, { useState } from 'react'
import { Field, Formik } from 'formik'
import * as yup from 'yup';
import { BASE_URL } from '../../constants/Config';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-native';
import { ScrollView, } from 'react-native';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import CheckBox from 'react-native-check-box';


const RegisterPage = ({ navigation }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const handleCheckBoxChange = (checked) => {
        setIsChecked(checked);
        setIsButtonDisabled(!checked);
    };

    const { userInfo } = useContext(AuthContext);

    const handleRegister = async (values) => {
        try {

            const token1 = userInfo.data?.accessToken
            console.log(token1)
            var requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',  // I added this line
                    "Authorization": token1
                },
                body: JSON.stringify(values)
                // redirect: 'follow'
            };
            const response = await fetch(`${BASE_URL}/registration/users`, requestOptions)
            const result = await response.json();

            let res = result?.code
            if (res === 500) {
                Alert.alert('Enter Valid Credential / Email already exist')
            } else {
                navigation.navigate('Login')
                Alert.alert('You have Successfull login, Please login')
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const Validated1 = yup.object().shape({
        userEmail: yup.string()

            .min(4, 'Password must be at least 5 characters')
            .max(50, 'Too Long!')
            .required('Field is required'),
        userMobile: yup.string()
            .min(10, 'Too Short!')
            .max(13, 'Too Long!')
            .required('Required'),

        userPasswd: yup.string()
            .min(10, 'Too Short!')
            .max(13, 'Too Long!')
            .required('Required'),
        userFName: yup.string()
            .min(10, 'Too Short!')
            .max(13, 'Too Long!')
            .required('Required'),
        userLName: yup.string()
            .min(10, 'Too Short!')
            .max(13, 'Too Long!')
            .required('Required')
    });

    //------------------Dropdown

    const DropdownPicker = ({ field, form, options, ...props }) => {
        return (
            <Picker
                selectedValue={field.value}
                onValueChange={(value, index) => form.setFieldValue(field.name, value)}
                {...props}
            >
                {AadharYesNoCheck.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
            </Picker>
        );
    };

    const AadharYesNoCheck = [
        { label: 'Select', value: 'select' },
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ];



    return (
        <ScrollView>
            <SafeAreaView style={{ paddingTop: 50 }}>
                <Formik initialValues={{
                    userEmail: '', userMobile: '', userPasswd: '', userFName: '', userMName: '',
                    userLName: '', referralCode: '', aadharYesNo: [''],
                    userRole: "3"
                }}

                    // onSubmit={ (values) =>
                    //     alert(`Email: ${values.userEmail}, Password: ${values.userPasswd},
                    //     Password: ${values.userRole}`)}

                    onSubmit={(values) => handleRegister(values)}
                    validationSchema={Validated1}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <Text style={styles.register}>Register</Text>
                            <View style={{ padding: 15 }}>
                                <Text style={styles.text}>Enter New Email</Text>
                                <TextInput style={styles.textInput}
                                    placeholder='Enter the New Email'
                                    onBlur={handleBlur('userEmail')}
                                    value={values.userEmail}
                                    onChangeText={handleChange('userEmail')} />
                                {touched.userEmail && errors.userEmail &&
                                    <Text style={styles.errorText}>{errors.userEmail}</Text>}

                                <Text style={styles.text}>Enter Phone</Text>
                                <TextInput style={styles.textInput}

                                    placeholder='Enter the Phone No.'
                                    onBlur={handleBlur('userMobile')}
                                    value={values.userMobile}
                                    onChangeText={handleChange('userMobile')} />
                                {touched.userMobile && errors.userMobile &&
                                    <Text style={styles.errorText}>{errors.userMobile}</Text>}

                                <Text style={styles.text}>Enter Password</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Enter the Password'
                                    onBlur={handleBlur('userPasswd')}
                                    value={values.userPasswd}
                                    onChangeText={handleChange('userPasswd')} />
                                {touched.userPasswd && errors.userPasswd &&
                                    <Text style={styles.errorText}>{errors.userPasswd}</Text>}

                                <Text style={styles.text}>Enter First Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Enter the First Name.'
                                    onBlur={handleBlur('userFName')}
                                    value={values.userFName}
                                    onChangeText={handleChange('userFName')} />
                                {touched.userFName && errors.userFName &&
                                    <Text style={styles.errorText}>{errors.userFName}</Text>}

                                <Text style={styles.text}>Enter Middle Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Enter the Middle Name'
                                    onBlur={handleBlur('userMName')}
                                    value={values.userMName}
                                    onChangeText={handleChange('userMName')} />

                                <Text style={styles.text}>Enter Last Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Enter the Last Name.'
                                    onBlur={handleBlur('userLName')}
                                    value={values.userLName}
                                    onChangeText={handleChange('userLName')} />
                                {touched.userLName && errors.userLName &&
                                    <Text style={styles.errorText}>{errors.userLName}</Text>}

                                <Text style={styles.text}>Enter Refferal Code(optional)</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='referralCode'
                                    // value={values.referralCode}
                                    onBlur={handleBlur('referralCode')}
                                    onChangeText={handleChange('phone')} />

                                <Text style={styles.text}>  Aadhar linked to Mobile No?(*)Yes/No</Text>
                                <View style={{
                                    borderWidth: 1, borderColor: 'black', position: 'relative',
                                    width: 250, height: 50, marginStart: 15, paddingBottom: 15
                                }}>
                                    <Field

                                        name="aadharYesNo"
                                        component={DropdownPicker}
                                        options={AadharYesNoCheck}
                                    />
                                </View>
                                {/* <DropDownPicker
                                    style={styles.textInput1}
                                    items={AadharYesNoCheck}
                                    defaultValue={values.aadharYesNo}
                                    placeholder="Select"
                                    containerStyle={{ height: 40 }}
                                  //  onChangeItem={(item) => handleChange('aadharYesNo')(item.value)}
                                    onChangeItem={(item) => handleChange('aadharYesNo')(item.value)}
                                /> */}

                            </View>


                            {/* <Text style={{ paddingHorizontal: 10, textAlign: 'center' }}>Please ensure that there are no special characters in the name.</Text> */}
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', paddingStart: 20,
                            }}>
                                <CheckBox style={{ paddingStart: 5 }} isChecked={isChecked}
                                    onClick={() => handleCheckBoxChange(!isChecked)}
                                />

                                <Text style={styles.accept}>

                                    I accept the Terms and Conditions & Privacy Policy</Text>
                            </View>


                            <View style={styles.buttonView}>
                                <Button title='Submit' disabled={isButtonDisabled} onPress={handleSubmit} />
                                <Text></Text>
                                <Button title='Close' onPress={() => navigation.navigate('Login')} />
                            </View>
                        </>
                    )}
                </Formik>

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 15,
        marginVertical: 1,
        height: 40

    },
    textInput1: {
        marginHorizontal: 15,
        width: '50%',
        height: 30,
        alignItems: 'center',
        textAlign: 'center',


    },
    register:
        { fontSize: 40, textAlign: 'center', color: 'black', fontFamily: 'Calibri-bold' },

        text: { paddingHorizontal: 15, fontSize: 12, color: 'grey' },
        accept:{
            padding: 10, textAlign: 'center',
            paddingBottom: 20
        },

        buttonView:{ paddingHorizontal: 30, marginBottom: 60 }


})

export default RegisterPage