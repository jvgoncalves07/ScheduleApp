import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import firebase from "../../config/firebase";
import styles from "./style";


export default function NewTask({ navigation, route }){
  const [description, setDescription] = useState(null)
  const database = firebase.firestore()

    function addTask(){
        database.collection(route.params.idUser).add({
            description: description,
            status: false
        })
        navigation.navigate("Task", { idUser:route.params.idUser })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Description</Text>
            <TextInput
            style={styles.input}
            placeholder = "Ex: estudar js"
            type="text"
            onChangeText={(text)=> setDescription(text)}
            value={description}
            />
            <TouchableOpacity
             style={styles.buttonNewTask}
             onPress={()=>{
                addTask()
            }}
            >
                <Text style={styles.iconButton}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}