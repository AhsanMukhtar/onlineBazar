import React,{useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { COLORS, FONTS, SIZE } from "../constants";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const CreateAdScreen = () => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const postData = async () => {
        try {
            if(!name || !desc || !year || !price || !phone){
                Alert.alert("please fill all the fields");
            }
            else{
                await firestore().collection('ads')
                .add({
                    name,
                    desc,
                    year,
                    price,
                    phone,
                    image,
                    uid: auth().currentUser.uid
                })
                Alert.alert("your Add successfully posted.!")
            }
        } catch (error) {
            Alert.alert("something went wrong please try again.")
        }
       
    }

    const openCamera = () => {
        launchImageLibrary({quality:0.5}, (fileobj)=>{
            const uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.uri)
            
            uploadTask.on('state_changed', 
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress == 100){
                        alert("uploaded")
                    }   
                }, 
                (error) => {
                    alert("something went wrong")
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );

        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleStyle}>Create AD!</Text>
            <TextInput
                label="Ad title"
                value={name}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Describe what you are selling"
                value={desc}
                mode="outlined"
                numberOfLines={3}
                multiline={true}
                onChangeText={text => setDesc(text)}
            />
            <TextInput
                label="Year of purchase"
                value={year}
                mode="outlined"
                keyboardType='numeric'
                onChangeText={text => setYear(text)}
            />
            <TextInput
                label="Price in PKR"
                value={price}
                mode="outlined"
                keyboardType='numeric'
                onChangeText={text => setPrice(text)}
            />
            <TextInput
                label="Contact Number"
                value={phone}
                mode="outlined"
                keyboardType='numeric'
                onChangeText={text => setPhone(text)}
            />
            <Button icon="camera" mode="contained" onPress={() => openCamera()}>
                Upload Image
            </Button>
            <Button disabled={image?false:true} mode="contained" onPress={() =>  postData()}>
                Post
            </Button>
        </View>
    )
};

export default CreateAdScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'space-evenly',
    },
    titleStyle: {
        fontSize: SIZE.h1,
        color: COLORS.darkgray,
        textAlign: 'center',
      },
})
