import React, {useState, useEffect} from "react";
import { 
    View, 
    Text,
    TouchableOpacity,
    FlatList 
} from "react-native";

import firebase from "../../config/firebase"
import styles from "./style";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"

export default function Task({ navigation, route }){
    const [task, setTask] = useState([])
    const database = firebase.firestore()

    function logout(){
        firebase.auth().signOut().then(() => {
            navigation.navigate("Login")
          }).catch((error) => {

          });
    }

    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).delete()
    }

    useEffect(()=>{
        let isMounted = true;
        database.collection(route.params.idUser).onSnapshot((query)=>{
            if(isMounted){
            const list =[]
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        }})
        return () => { isMounted = false };
    }, [])

    

    return(
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={task}
                renderItem={({ item })=>{
                    return (
                    <View style={styles.deleteTask}>
                        <TouchableOpacity 
                            style={styles.deleteTask}
                            onPress={() => {
                                deleteTask(item.id)
                            }}
                        >
                        <FontAwesome
                        name="check"
                        size={23}
                        color="#008000"
                        >
                        </FontAwesome>  
                        </TouchableOpacity>
                        <Text
                            style={styles.DescriptionTask}
                            onPress={()=>{
                                navigation.navigate("Details",{
                                    id: item.id,
                                    description: item.description,
                                    idUser: route.params.idUser
                                })
                            }}
                        >
                        {item.description}
                        </Text>
                    </View>
                    )
                }}
            />
            <TouchableOpacity style
            style={styles.buttonNewTask}
            onPress={() => navigation.navigate( "NewTask", { idUser:route.params.idUser })}
            >

                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={()=>{logout()}}
            >
                <Text style={styles.iconButtonLogout}>
                    <MaterialCommunityIcons
                        name="location-exit"
                        size={23}
                        color="#0000ff"
                    />
                </Text>
            </TouchableOpacity>
        </View>
    )
}