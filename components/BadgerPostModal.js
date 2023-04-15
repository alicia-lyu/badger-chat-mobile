import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

export default function BadgerPostModal(props) {
    const [title, onChangeTitle] = useState("");
    const [content, onChangeContent] = useState("");
    const navigation = useNavigation();

    const handlePost = async () => {
        const jwt = await SecureStore.getItemAsync("jwt");
        const options = {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_30e5ed25e99b26f8f91c",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        };
        const res = await fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.chatroom}/messages`, options);
        const data = await res.json();
        if (res.status === 200) {
            onChangeTitle("");
            onChangeContent("");
            setTimeout(props.toggle, 500)
            setTimeout(props.refresh, 1000)
        } else {
            Alert.alert("Uh-oh", data.msg);
        }
    }

    const navigateToConversion = () => {
        props.toggle();
        navigation.navigate("Sign Up");
    }

    return <Modal isVisible={props.visible}>
        <View style={styles.modal}>
            {
                props.guestAccess ?
                <>
                    <Text style={styles.subtitle}>You are viewing chatroom as a guest.</Text>
                    <Text style={styles.subtitle}>Sign up to add post!</Text>
                    <Button title="Sign Up" onPress={navigateToConversion}/>
                </>
                :
                    <>
                        <Text style={styles.title}>Create a Post</Text>
                        <View>
                            <Text>Title</Text>
                            <TextInput placeholder="Your post title" value={title} onChangeText={onChangeTitle} style={styles.inputBox} />
                            <Text>Content</Text>
                            <TextInput multiline={true} placeholder="Your post content" value={content} onChangeText={onChangeContent} style={[
                                styles.inputBox,
                                {height: 100}
                                ]} />
                            <Button title="Post" onPress={handlePost} />
                        </View>
                    </>                
            }
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "rgba(255 255 255 / 0.9)",
        display: "flex",
        justifyContent: "center"
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        marginVertical: 10
    },
    inputBox: {
        backgroundColor: "#fff",
        borderColor: "#e5e5e5",
        borderRadius: 3,
        padding: 10,
        marginVertical: 5
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 5,
    }
});