import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import authStyles from "../styles/authStyles";

function BadgerRegisterScreen(props) {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [rePassword, onChangeRePassword] = useState("");

    function handleSubmit() {
        if (password == "") {
            Alert.alert("Empty password", "You should enter a password");
        } else if (password !== rePassword) {
            Alert.alert("Passwords do not match", "You must reenter the same password")
        } else {
            props.handleSignup(username, password);
        }
    }


    return <View style={authStyles.container}>
        <View style={authStyles.header}>
            <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        </View>
        <View style={authStyles.body}>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Username</Text>
                <View style={authStyles.inputBox}>
                    <TextInput 
                    style={authStyles.inputBoxText} 
                    value={username} 
                    onChangeText={onChangeUsername}
                    placeholder="username"
                    autoCorrect={false}
                    autoCapitalize='none'
                     />
                </View>
            </View>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Password</Text>
                <View style={authStyles.inputBox}>
                    <TextInput 
                    style={authStyles.inputBoxText} 
                    value={password} 
                    onChangeText={onChangePassword} 
                    placeholder="password"
                    secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Re-enter Password</Text>
                <View style={authStyles.inputBox}>
                    <TextInput 
                    style={authStyles.inputBoxText} 
                    value={rePassword} 
                    onChangeText={onChangeRePassword} 
                    placeholder="re-enter password"
                    secureTextEntry={true}
                    />
                </View>
            </View>
            <Button title="Signup" onPress={handleSubmit} />

        </View>
        <View style={authStyles.footer}>
            <Button color="#575757" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
        </View>
    </View>;
}

export default BadgerRegisterScreen;