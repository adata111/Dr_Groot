import 'react-native-gesture-handler';
import * as React from "react";
import { Card, CardItem } from 'react-native-elements';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, Image, Button } from "react-native";
export default function Shoplist({ navigation }) {
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
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g1.jpg')}

              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="Nursery"/>
        </Card>

        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g2.jpg')}
              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="PlantBubble"/>
        </Card>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g3.jpg')}
              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="Grow Wiser"/>
        </Card>

        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g4.jpg')}
              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="IncrediGreen"/>
        </Card>

      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g5.jpg')}
              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="Grow more"/>
        </Card>

        <Card>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('./g6.jpg')}
              style={{
                width: 150,
                height: 150,

              }}
            />
          </View>
          <Button title="WIN Wood"/>
        </Card>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(43,161,137,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});