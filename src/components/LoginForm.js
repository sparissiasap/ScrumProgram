import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { loginUrl as LoginUrl, CustomerLoggedID as CustomerLoggedID } from '../../app.json';
import axios from 'axios';
import * as RootNavigation from '../../RootNavigation';
import { styles as styles } from '../style/styles';

export default class LoginForm extends Component {
    state = {
        username: "",
        password: "",
        organizationID: "",
        isLoggedIn: false,
        Message: "",
        AccountInformation: {
            AccountID: 0,
            CustomerID: 0,
            FirstName: "",
            LastName: "",
            Email: "",
            HasActiveEnrollments: false
        },
        sending: false
    }

    setCustomerID = async () => {
        await AsyncStorage.setItem(CustomerLoggedID, this.state.AccountInformation.CustomerID.toString());
    }

    onPress = async () => {
        this.setState({ sending: true });
        try {
            axios.post(
                LoginUrl,
                JSON.stringify({
                    Password: this.state.password,
                    Username: this.state.username
                }), {
                headers: {
                    'Authorization': 'user=org3448&organizationId=3448&password=505BC82&apiKey=A79F516',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'asap_accesstoken': 'c821cba13b13468e52cb36f393fe04e6a4a90850'
                }
            }).then(response => {
                this.setState({ AccountInformation: response.data[0], Message: response.data[0].FirstName + ' ' + response.data[0].LastName });
                RootNavigation.navigate('Home', { userName: this.state.Message });
                this.setCustomerID();
            });
        }
        catch (error) {
            this.setState({ Message: error });
        }
        finally {
            this.setState({ sending: false });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>HeyAPP</Text>
                <View style={styles.inputView} >
                    <TextInput style={styles.inputText} placeholder="Username..." placeholderTextColor="#003f5c" onChangeText={text => this.setState({ username: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput secureTextEntry style={styles.inputText} placeholder="Password..." placeholderTextColor="#003f5c" onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={this.onPress}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>
                <Text style={styles.loginText}>{this.state.Message}</Text>
            </View>
        )
    }
};