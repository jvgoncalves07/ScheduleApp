import React, { useState } from "react";
import  {View, 
        Text,
        TextInput,
        TouchableOpacity,
        KeyboardAvoidingView, 
        Platform
} from "react-native"

import firebase from "../../config/firebase";
import styles from "./style"
import {MaterialCommunityIcons} from "@expo/vector-icons"



export default function NewUser({ navigation }){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorRegister, setErrorrRegister] = useState("")
    
    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            let user = userCredential.user;
            navigation.navigate("Task", {idUser: user.uid})

        })
        .catch((error) => {
            setErrorrRegister(true)
            let errorCode = error.code;
            let errorMessage = error.message;

        });
    }

    return (
        <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"} 
         style={styles.container}
        >
             <Text style={styles.title}>Create a Task account</Text>
            <TextInput
             style={styles.input}
             placeholder="Enter your email"
             type="text"
             onChangeText={(text)=> setEmail(text)}
             value={email}
            />
            <TextInput
             style={styles.input}
             secureTextEntry={true}
             placeholder="Enter a password"
             type="text"
             onChangeText={(text)=> setPassword(text)}
             value={password}
            />

            {errorRegister === true

                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                        name="alert-circle"
                        size={24}
                        color="#bdbdbd"
                        />
                        <Text style={styles.warningAlert}>Invalid email or password</Text>
                    </View>
                :
                    <View/>
            }

            {email === "" || password === ""

             ?
                <TouchableOpacity
                 disable={true}
                 style={styles.buttonRegister}
                >
                  <Text style={styles.textButtonRegister}>Register</Text>
                </TouchableOpacity>
             :

                <TouchableOpacity
                style={styles.buttonRegister}
                onPress={register}
                >
                <Text style={styles.textButtonRegister}>Register</Text>
                </TouchableOpacity>
            }

                <Text style={styles.login}>
                Already registered?
                <Text
                 style={styles.linkLogin}
                 onPress={()=> navigation.navigate("Login")}
                >
                     Login
                </Text>
            </Text>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    );
}