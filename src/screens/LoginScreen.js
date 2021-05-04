import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { onlineBazar } from "../constants/images";
import { COLORS, FONTS, SIZE } from "../constants";
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userLogin = async () => {
        if(!email || !password) {
            Alert.alert("Please enter all the fields");
            return
        }
        try {
            const result = await auth().signInWithEmailAndPassword(email,password)
            console.log(result.user);
        } catch (error) {
            Alert.alert("Something went wrong");
        }
    };

    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Image source={onlineBazar} style={styles.logoImage} resizeMode="contain" />
                <Text style={styles.titleStyle}>Please Login to Continue!</Text>
            </View>
            <View style={styles.box2}>
                <TextInput
                    label="Email"
                    value={email}
                    mode="outlined"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Password"
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <Button mode="contained" onPress={() => userLogin()}>
                   Login
                </Button>
                <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                    <Text style={{textAlign: 'center'}}>Dont have a account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    logoImage: {
        height: 220,
        width: 280,
        // backgroundColor: 'red',
    },
    box1: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 30,
    },
    box2: {
       paddingHorizontal: 40,
       height: '50%',
       justifyContent: 'space-evenly',
    },
    titleStyle: {
      fontSize: SIZE.h2,
      marginVertical: -20,
      color: COLORS.darkgray,
    },
   
})

export default LoginScreen;
