import 'react-native-gesture-handler';
import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground, ScrollView} from "react-native";
export default function Home({ navigation }){
    const __startGallery = async () => {
      navigation.navigate('Gallery');
      console.log('HELLO HELLO');
    }

    const __startChecking = async () => {
      navigation.navigate('CheckPlant');
      console.log('HELLO ');
    }
      const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('https://88b2-5-69-247-201.ngrok.io/time', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCurrentTime(data.time);

    });

  }, []);

  return (
    <ImageBackground
        source={require('./home.png')}
        style={styles.back}>
        <View style={styles.container}>
            <Text style={styles.title}>Dr. Groot</Text>
            <Text style={styles.subtitle}>Your Personal Plant Doctor</Text>
            <TouchableOpacity style={ styles.button } onPress={__startChecking}>
                <Text style={ styles.buttonText }>Check My Plant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.button } onPress={__startGallery}>
                <Text style={ styles.buttonText } >Gallery</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
   );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,0)',
   justifyContent: 'center',
   paddingLeft: 60,
   paddingRight: 60,
 },

 button: {
    alignItems: "center",
    paddingVertical: 10,
    margin: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2ba189',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  back: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

   title: {
      fontWeight: 'bold',
      fontSize: 40,
      paddingBottom: 10,
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    marginBottom: 5,
},
 });