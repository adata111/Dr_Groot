import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

// import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
// import { RNCamera } from 'react-native-camera'
// import CameraPage from './pages/camera';

// export default function App() {
//   return (
//     <View style={styles.screen}>
//       <SafeAreaView style={styles.saveArea}>
//         <View style={styles.topBar}>
//           <Text style={styles.topBarTitleText}>React Native Scanner</Text>
//         </View>
//       </SafeAreaView>

//       <View style={styles.caption}>
//         <Text style={styles.captionTitleText}>Welcome To React-Native-Camera Tutorial</Text>
//       </View>

//       <RNCamera 
//         //   ref={ref => {
//         //     this.camera = ref;
//         // }} 
//         style={styles.rnCamera} 
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.on}
//         captureAudio={false}
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//         // androidRecordAudioPermissionOptions={{
//         //   title: 'Permission to use audio recording',
//         //   message: 'We need your permission to use your audio',
//         //   buttonPositive: 'Ok',
//         //   buttonNegative: 'Cancel',
//         // }}
//       />

//       <View style={styles.cameraControl}>
//         <TouchableOpacity style={styles.btn}>
//           <Text style={styles.btnText}>New QR Scan</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topBar: {
//     height: 50,
//     backgroundColor: '#62d1bc', // green
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   topBarTitleText: {
//     color: '#ffffff', // white
//     fontSize: 20,
//   },
//   caption: {
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   captionTitleText: {
//     color: '#121B0D', // black
//     fontSize: 16,
//     fontWeight: '600'
//   },
//   rnCamera: {
//     flex: 1,
//     width: '94%',
//     alignSelf: 'center',
//   }
// });


