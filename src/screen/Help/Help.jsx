import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {React, useState} from 'react'
import {View, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Faq from './Faq';
import Glossary from './Glossary';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Help = ({navigation}) => {
  const Tab = createBottomTabNavigator();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Glossary', value: 'apple'},
      {label: 'FAQs', value: 'banana'}
    ]);
return (
    <>
     <View style={{padding: 10, alignItems:'center'}}>
   
       </View>
        <Tab.Navigator>
          <>         
          <Tab.Screen name='Glossary' component={Glossary} options={{headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Icon name="package"
            size={20}
            color='black' />
              </View>
            );
          },}} />
          <Tab.Screen name='Faq' component={Faq} options={{headerShown: false, 
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Icon1 name="frequently-asked-questions"
            size={20}
            color='black' />
              </View>
            );
          },}} />    
      </>
        </Tab.Navigator>
     
    <View>
        
    {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /> */}
   
    </View>
    </>
)
}

export default Help