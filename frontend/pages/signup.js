import 'react-native-gesture-handler';
import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

export default function Signup({ navigation }) {
    return (
        <ImageBackground
            source={require('./home.png')}
            style={styles.back}>
            <View style={styles.container}>
                <Text style={styles.title}>Dr. Groot</Text>
                <Text style={styles.subtitle}>Your Personal Plant Doctor</Text>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="First Name"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                // onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Last Name"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                // onChange={(e) => this.setState({ pass: e.nativeEvent.text })}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Username"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                // onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    secureTextEntry={true}
                // onChange={(e) => this.setState({ pass: e.nativeEvent.text })}
                />
                <TouchableOpacity style={styles.button}>
                    <Text>Submit</Text>
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

    input: {
        color: 'black',
        alignSelf: 'stretch',
        height: 40,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        //borderRadius: 5,
        textAlignVertical: "top",
        //backgroundColor: 'rgba(255,255,255,0.6)',
    },
});



