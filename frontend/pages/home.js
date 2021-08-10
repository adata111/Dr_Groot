import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground} from "react-native";
import {Camera} from 'expo-camera';
export default function Home({ navigation }){

    const [startCamera, setStartCamera] = React.useState(false)
    const __startCamera = async () => {
        const {status} = await Camera.requestPermissionsAsync()
        console.log(status)
        if (status === 'granted') {
        //   setStartCamera(true);
          navigation.navigate('Camera');
        } else {
          Alert.alert('Access denied')
        }
      }
  return (
    <ImageBackground
        source={require('./home.png')}
        style={styles.back}>
        <View style={styles.container}>
            <Text style={styles.title}>Dr. Groot</Text>
            <Text style={styles.subtitle}>Your Personal Plant Doctor</Text>
            {/* <Text style={styles.subtitle}>Plant Doctor</Text> */}
            <TouchableOpacity style={ styles.button }>
                <Text style={ styles.buttonText } onPress={__startCamera}>Check My Plant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.button }>
                <Text style={ styles.buttonText }>Gallery</Text>
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



