import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView,TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { onlineBazar } from "../constants/images";
import { COLORS, FONTS, SIZE } from "../constants";
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userSignup = async () => {
        if(!email || !password){
            Alert.alert("Please enter all the fields");
            return
        }
        try {
            await auth().createUserWithEmailAndPassword(email,password)
        } catch (error) {
            Alert.alert("Something went wrong please try again");
        }  
    };

    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Image source={onlineBazar} style={styles.logoImage}  resizeMode="contain"/>
                <Text style={styles.titleStyle}>Please Signup!</Text>
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
                <Button mode="contained" onPress={() => userSignup()}>
                  Signup
                </Button>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Text style={{textAlign: 'center'}}>Already have an Account?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    logoImage: {
        height: 220,
        width: 280,
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

export default SignupScreen;
