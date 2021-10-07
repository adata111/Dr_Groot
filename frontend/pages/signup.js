import 'react-native-gesture-handler';
import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import axios from 'axios'
export default class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          username: "",
          password: ""
        };

        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

    async onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name);
        console.log(e.target.value);
    }

    async onSubmit() {
        console.log(this.state.username);
        console.log(this.state.password);

        const newUser = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(newUser);

        let formdata = new FormData();
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        
        axios
            .post('https://8fd5-2409-4042-2eac-3ada-c461-9d84-5648-190e.ngrok.io/register', formdata)
            .then(res => {
                console.log(`statusCode: ${res.status}`)
                console.log(res);
                this.props.navigation.navigate("Loading");
            })
            .catch(error => {
                console.error(error)
                alert(error)
            })
    }
    render() {
        return (
            <ImageBackground
                source={require('./home.png')}
                style={styles.back}>
                <View style={styles.container}>
                    <Text style={styles.title}>Plant beat</Text>
                    <Text style={styles.subtitle}>Your Personal Plant Doctor</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Username"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        // onChange={this.onChange}
                    onChange={(e) => this.setState({ username: e.nativeEvent.text })}
                    />
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="black"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        // onChange={this.onChange} 
                    onChange={(e) => this.setState({ password: e.nativeEvent.text })}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
    
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
