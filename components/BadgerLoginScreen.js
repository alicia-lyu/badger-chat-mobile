import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import authStyles from "../styles/authStyles";

function BadgerLoginScreen(props) {
    const [username, onChangeUsername] = useState("username");
    const [password, onChangePassword] = useState("password");


    const handleLogin = () => {
        Alert.alert("Hmmm...", "I should check the user's credentials first!");
        props.handleLogin("myusername", "mypassword")
    }

    return <View style={authStyles.container}>
        <View style={authStyles.header}>
            <Text style={{fontSize:36}}>BadgerChat Login</Text>
        </View>
        <View style={authStyles.body}>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Username</Text>
                <View style={authStyles.inputBox}>
                    <TextInput onChangeText={onChangeUsername} value={username} style={authStyles.inputBoxText} />
                </View>
            </View>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Password</Text>
                <View style={authStyles.inputBox}>
                    <TextInput onChangeText={onChangePassword} value={password} style={authStyles.inputBoxText} />
                </View>
            </View>
            <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={authStyles.footer}>
            <Text>New here?</Text>
            <Button title="Signup" onPress={() => props.setIsRegistering(true)} />
        </View>
    </View>;
}

export default BadgerLoginScreen;