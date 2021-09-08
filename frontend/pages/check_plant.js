import 'react-native-gesture-handler';
import React, { useState, Component, useEffect } from "react";
import {StyleSheet, Alert, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import {Camera} from 'expo-camera';

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export default function CheckPlant({ navigation }) {

    const [cameraRollPer, setCameraRollPer] = React.useState(null)
    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync()
        console.log(status)
        if (status === 'granted') {
            //   setStartCamera(true);
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
      else{
        Alert.alert('Gallery access denied')
      }
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
    };

    toServer = async (mediaFile) => {
        let type = mediaFile.type;
        let route = "";
        let url = "";
        let content_type = "";
        type === "image"
            ? ((route = "/image"), (content_type = "image/jpeg"))
            : ((route = "/video"), (content_type = "video/mp4"));
        url = 'https://88b2-5-69-247-201.ngrok.io/save';
        let response = await FS.uploadAsync(url, mediaFile.uri, {
            headers: {
                "content-type": content_type,
            },
            httpMethod: "POST",
            uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
        });
        console.log(response.headers);
        console.log(response.body);
    };

    return (
        <ImageBackground
            source={require('./home.png')}
            style={styles.back}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={ styles.button }
                        onPress={__startGallery}
                    >
                        <Text style={styles.buttonText}>Pick from Gallery</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={ styles.button } onPress={__startCamera}>
                    <Text style={styles.buttonText}>Click a Picture</Text>
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