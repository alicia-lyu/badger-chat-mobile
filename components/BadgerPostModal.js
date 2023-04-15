import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import * as SecureStore from 'expo-secure-store';

export default function BadgerPostModal(props) {
    const [title, onChangeTitle] = useState("");
    const [content, onChangeContent] = useState("");

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
        const res = await fetch( `https://cs571.org/s23/hw10/api/chatroom/${props.chatroom}/messages`, options);
        const data = await res.json();
        if (res.status === 200) {
            onChangeTitle("");
            onChangeContent("");
            setTimeout(props.toggle, 500).then(() => props.refresh());
        } else {
            Alert.alert("Uh-oh", data.msg);
        }
    }

    return <Modal isVisible={props.visible}>
        <View style={styles.modal}>
            <Text style={styles.title}>Create a Post</Text>
            <View style={styles.wrapper}>
                <Text>Title</Text>
                <TextInput placeholder="Your post title" value={title} onChangeText={onChangeTitle} style={styles.inputBox}/>
                <Text>Content</Text>
                <TextInput multiline={true} placeholder="Your post content" value={content} onChangeText={onChangeContent} style={styles.inputBox}/>
                <Button title="Post" onPress={handlePost} />
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "rgba(255 255 255 / 0.9)"
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        margin: 5
    },
    wrapper: {
        margin: 10
    },
    inputBox: {
        backgroundColor: "#fff",
        borderColor: "#e5e5e5",
        borderRadius: 3,
        padding: 10,
        marginVertical: 5
    }
});