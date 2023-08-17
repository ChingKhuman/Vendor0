import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={{flex: 1, justifyContent:'center', backgroundColor: '#06bcee'}}>
            <ActivityIndicator size='large' color="#fffff"/>
<Text>Check</Text>

        </View>
    )
}
export default SplashScreen;