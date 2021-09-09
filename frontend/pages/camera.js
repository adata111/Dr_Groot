import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, Touchable } from 'react-native'
import { Camera } from 'expo-camera'
import * as FS from 'expo-file-system';
let camera = Camera
export default function CameraPage() {
  const [startCamera, setStartCamera] = React.useState(true)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [detailsVisible, setDetailsVisible] = React.useState(false)
  const [details, setDetails] = React.useState(null)

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }
  const __savePhoto = () => {
    prepare(capturedImage);
  }

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

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };
  
  toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let route = "";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    // url = schema + host + ":" + port + route;
    url = 'https://88b2-5-69-247-201.ngrok.io/save';
  
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    resjson = JSON.parse(response.body);
    if (response.body && resjson.mess) {
      setDetailsVisible(true)
      setDetails(resjson)
      console.log(resjson)
  
    }
    else {
      Alert.alert('Something went wrong while trying to save and analyze. Pls try again!')
    }
  };
  

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            detailsVisible && details ? (
              <Results photo={capturedImage} details={details} />
            ) : (
              <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
            )
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: 50,
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})


const SendFileToBackend = (uri) => {
  console.log(uri);
  const form = new FormData();
  form.append("pic", {
    name: "SampleFile.jpg", // Whatever your filename is
    uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
    type: "image/jpg", // video/mp4 for videos..or image/png etc...
  });

  // Perform a Post request to backend server by putting `form` in the Body of the request
  fetch('https://88b2-5-69-247-201.ngrok.io/upload', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'multipart/form-data, application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify({ 'pic': "123" })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setCurrentTime(1000);
    });

};

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  console.log('preview', photo)
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
              onPress={retakePicture}
              style={styles.previewButtons}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}>
                Re-take
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
          padding: 5
        }}
      >
        <Text
          style={{
            color: '#3a3b3c',
            fontSize: 20
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
  )
}

