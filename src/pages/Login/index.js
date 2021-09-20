import React, { useState, useEffect } from "react";
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
import { NavigationContainer, useScrollToTop } from "@react-navigation/native";


export default function Login({ navigation }){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState("")

  const loginFirebase = ()=>{

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {

    let user = userCredential.user;
    navigation.navigate("Task", {idUser: user.uid})
    

    })
    .catch((error) => {
        setErrorLogin(true)
        let errorCode = error.code;
        let errorMessage = error.message;
     });
  }

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Task", { idUser: user.uid })
    
      }
    });

  }, []);
    
    return (
        <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"} 
         style={styles.container}
        >
            <Text style={styles.title}>ScheduleApp</Text>
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

            {errorLogin === true
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
                 style={styles.buttonLogin}
                >
                  <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
             :

                <TouchableOpacity
                style={styles.buttonLogin}
                onPress={loginFirebase}
                >
                <Text style={styles.textButtonLogin}>Login</Text>
                </TouchableOpacity>
            }
                <Text style={styles.registration}>
                Are you not registered?
                <Text
                 style={styles.linkSubscriber}
                 onPress={()=> navigation.navigate("NewUser")}
                >
                     Subscribe now
                </Text>
            </Text>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    );
}