import 'react-native-gesture-handler';
import React, { useState, Component, useEffect } from "react";
import { StyleSheet, Alert, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from 'expo-camera';

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export default function CheckPlant({ navigation }) {

  const [cameraRollPer, setCameraRollPer] = React.useState(null)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)
  const [detailsVisible, setDetailsVisible] = React.useState(false)
  const [details, setDetails] = React.useState(null)

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      navigation.navigate('Camera');
    } else {
      Alert.alert('Camera access denied')
    }
  }

  const __startGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      await pickMedia();
      setCameraRollPer(cameraRollPer);
    }
    else {
      Alert.alert('Gallery access denied')
    }
  }

  const __savePhoto = () => {
    prepare(selectedImage);
  }
  const __reselectPhoto = () => {
    setSelectedImage(null)
    setPreviewVisible(false)
    __startGallery()
  }

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  pickMedia = async () => {
    setCameraRollPer(cameraRollPer);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    if (result.cancelled) {
      return;
    }
    if (result.type == "image") {
      setPreviewVisible(true)
      setSelectedImage(result)
    }

  };

  const prepare = async (result) => {   // prepare image for sending
    if (result.type == "image") {
      await toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
    } else {
      let base64 = await uriToBase64(result.uri);
      await toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  }

  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let route = "";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = 'https://cee8-5-69-247-201.ngrok.io/save';
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    resjson = JSON.parse(response.body);
    // console.log(resjson.mess);
    // console.log(resjson);
    if (response.body && resjson.mess) {
      setDetailsVisible(true)
      setDetails(resjson)

    }
    else {
      Alert.alert('Something went wrong while trying to save and analyze. Pls try again!')
    }

  };

  return (
    <View style={{
      backgroundColor: 'rgba(255,255,255,0)',
      flex: 1,
      width: '100%',
      height: '100%'
    }}>

      {previewVisible && selectedImage ? (
        detailsVisible && details ? (
          <Results photo={selectedImage} details={details} />
        ) : (
          <ImagePreview photo={selectedImage} savePhoto={__savePhoto} reselectPhoto={__reselectPhoto} />
        )


      ) : (
        <ImageBackground
          source={require('./b4.jpg')}
          style={styles.back}>
          <View style={styles.container}>
            <View style={{marginTop: 150}}>
              <TouchableOpacity
                style={styles.button}
                onPress={__startGallery}
              >
                <Text style={styles.buttonText}>Pick from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={__startCamera}>
                <Text style={styles.buttonText}>Click a Picture</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>
      )}
    </View>

  );
}

const ImagePreview = ({ photo, reselectPhoto, savePhoto }) => {
  // console.log('preview', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={reselectPhoto}
              style={styles.previewButtons}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}>
                Select again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={styles.previewButtons}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}>
                Save and Analyze
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const Results = ({ photo, details }) => {
  return (
    <ImageBackground
      source={require('./b3.jpg')}
      style={styles.back}>
      <View style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0)',
        paddingLeft: 60,
        paddingRight: 60,
        flexDirection: 'column'
      }}>
        <View style={{ flex: 3 / 4, marginTop: 10, padding: 5 }}>

          <ImageBackground
            style={{ width: '100%', height: '100%' }}
            resizeMode='contain'
            source={{ uri: photo && photo.uri }}

          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5.
          }}
        >
          <Text
            style={{
              color: '#3a3b3c',
              fontSize: 20,
              fontWeight: 'bold'
            }}>
            {details.result}
          </Text>
          <Text
            style={{
              color: '#3a3b3c',
              fontSize: 15
            }}>
            {details.remedy}
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
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
  previewButtons: {
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
});