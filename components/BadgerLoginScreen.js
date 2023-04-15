import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import authStyles from "../styles/authStyles";
import rowStyles from "../styles/rowStyles";

function BadgerLoginScreen(props) {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");


    const handleLogin = () => {
        props.handleLogin(username, password);
    }

    return <View style={authStyles.container}>
        <View style={authStyles.header}>
            <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        </View>
        <View style={authStyles.body}>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Username</Text>
                <View style={authStyles.inputBox}>
                    <TextInput
                        onChangeText={onChangeUsername}
                        value={username}
                        style={authStyles.inputBoxText}
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
                        onChangeText={onChangePassword}
                        value={password}
                        style={authStyles.inputBoxText}
                        secureTextEntry={true}
                        placeholder="password"
                    />
                </View>
            </View>
            <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={authStyles.footer}>
            <Text style={{textAlign: "center"}}>New here?</Text>
            <View style={rowStyles.rowContainer}>
                <Button title="Signup" onPress={() => props.setIsRegistering(true)} />
                <Button title="Continue as a Guest" onPress={props.grantGuestAccess}/>
            </View>
        </View>
    </View>;
}

export default BadgerLoginScreen;