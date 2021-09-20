import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#fff",
 },
 label:{
    width:"90%",
    marginTop:20,
    marginLeft:20,
    fontSize:16,
    color:"#0000ff"
 },
 input:{
    width:"90%",
    marginTop:10,
    padding:10,
    height:50,
    borderBottomWidth:1,
    borderBottomColor:"#0000ff",
    marginLeft:"auto",
    marginRight:"auto"
 },
 buttonNewTask:{
    width:60,
    height:60,
    position:"absolute",
    bottom:30,
    left:20,
    backgroundColor:"#0000ff",
    borderRadius:50,
    justifyContent:"center",
    alignItems:"center"
 },
 iconButton:{
    color: "#fff",
    fontSize: 17,
    fontWeight:"bold",
 }

});

export default styles