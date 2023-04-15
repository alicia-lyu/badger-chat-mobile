import { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import authStyles from "../styles/authStyles";

function BadgerRegisterScreen(props) {
    const [username, onChangeUsername] = useState("username");
    const [password, onChangePassword] = useState("password");
    const [rePassword, onChangeRePassword] = useState("re-enter password");


    return <View style={authStyles.container}>
        <View style={authStyles.header}>
            <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        </View>
        <View style={authStyles.body}>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Username</Text>
                <View style={authStyles.inputBox}>
                    <TextInput style={authStyles.inputBoxText} value={username} onChange={onChangeUsername} />
                </View>
            </View>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Password</Text>
                <View style={authStyles.inputBox}>
                    <TextInput style={authStyles.inputBoxText} value={password} onChange={onChangePassword} />
                </View>
            </View>
            <View style={authStyles.inputContainer}>
                <Text style={authStyles.inputPrompt}>Re-enter Password</Text>
                <View style={authStyles.inputBox}>
                    <TextInput style={authStyles.inputBoxText} value={rePassword} onChange={onChangeRePassword} />
                </View>
            </View>
            <Button title="Signup" onPress={() => Alert.alert("Hmmm...", "This should do something!")} />

        </View>
        <View style={authStyles.footer}>
            <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
        </View>
    </View>;
}

export default BadgerRegisterScreen;