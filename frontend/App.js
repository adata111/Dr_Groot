// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import Home from 'home.js';


import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground} from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import CameraPage from './pages/camera.js';
import Gallery from './pages/gallery.js';
import Home from './pages/home.js';
import CheckPlant from './pages/check_plant.js';

const Stack = createStackNavigator();

export default function App(){
  
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Camera" component={CameraPage}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Gallery" component={Gallery}/>
        <Stack.Screen name="CheckPlant" component={CheckPlant}/>
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


