import 'react-native-gesture-handler';
import * as React from "react";
import { StyleSheet,Text, View, TouchableOpacity, ImageBackground} from "react-native";
export default function Shophome({ navigation }){
    
  const __openShops = () =>{
    navigation.navigate("Shop List")
  }
  return (
    <ImageBackground
        source={require('./b5.jpg')}
        style={styles.back}
        imageStyle= {{opacity:0.7}}>
        <View style={styles.container}>
            <Text style={styles.title}>Presents</Text>
            <Text style={styles.title}>for Plants</Text>
            <Text style={styles.subtitle}>Plant care shops</Text>
            <TouchableOpacity style={ styles.button } onPress={__openShops}>
                <Text style={ styles.buttonText }>Shops near me</Text>
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
      color: 'white',
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    marginBottom: 5,
    color: 'black'
},
 });



