import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';

function App() { 

   return (
  <AuthProvider>
   <StatusBar backgroundColor="#06bcee"/>
 <Navigation/>
  </AuthProvider>

   )
}



export default App;
