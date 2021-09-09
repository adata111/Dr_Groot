
import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground} from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import CameraPage from './pages/camera.js';
import Gallery from './pages/gallery.js';
import Home from './pages/home.js';
import CheckPlant from './pages/check_plant.js';
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Loading from './pages/loading.js';

const Stack = createStackNavigator();

export default function App(){
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={Signup}/>
        <Stack.Screen name="Loading" component={Loading}/>
      </Stack.Navigator>
    </NavigationContainer>
   );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,0.3)',
   justifyContent: 'center',
   paddingLeft: 60,
   paddingRight: 60,
 },
});


